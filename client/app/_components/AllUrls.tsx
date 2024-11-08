"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import {api} from "@/app/api/conf";
import Cookies from "js-cookie";
import {UrlType, UrlTypeEdit} from "@/app/type/types";
import {QRCodeCanvas} from "qrcode.react";

const AllUrls = () => {
    const [urls, setUrls] = useState<UrlType[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<UrlTypeEdit | null>(null);
    const [oldShortUrl, setOldShortUrl] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(`${window.location.protocol}//${window.location.host}/`);
        }
    }, []);

    useEffect(() => {
        axios.get(`${api}/url/get/all`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": Cookies.get("accessToken"),
            }
        }).then((response) => {
            setUrls(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const copyQRCode = (url: string) => {
        const canvas = document.getElementById(`qr-${url}`) as HTMLCanvasElement;
        if (canvas) {
            canvas.toBlob((blob) => {
                if (blob) {
                    const item = new ClipboardItem({"image/png": blob});
                    navigator.clipboard.write([item]);
                }
            });
        }
    };

    const handleEdit = (index: number) => {
        const url = urls[index];
        setEditIndex(index);
        setFormData({...url, password: ""});
        setOldShortUrl(url.shortUrl);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    };

    const handleSave = () => {
        if (formData) {
            const dataToSend = {...formData, oldShortUrl};
            axios.put(`${api}/url/update`, dataToSend, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": Cookies.get("accessToken"),
                }
            }).then(() => {
                setUrls(urls.map((url, index) => index === editIndex ? formData : url));
                setEditIndex(null);
                setFormData(null);
                setOldShortUrl("");
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    return (
        <div className="min-h-full p-4 text-gray-200 bg-gray-900">
            <h1 className="text-2xl mb-4 font-semibold">All URLs</h1>
            {urls.map((url, index) => (
                <div key={index} className="border-b border-gray-700 mb-4">
                    <button
                        className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => toggleAccordion(index)}
                    >
                        {baseUrl}{url.shortUrl}
                    </button>
                    <div
                        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                    >
                        <div className="p-4 bg-gray-800 shadow-md rounded-md">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    {editIndex === index ? (
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-400">Long URL: {url.longUrl}</p>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-400">{baseUrl}</span>
                                                <input
                                                    type="text"
                                                    name="shortUrl"
                                                    value={formData?.shortUrl || ""}
                                                    onChange={handleChange}
                                                    placeholder="Enter short URL"
                                                    className="text-sm text-gray-400 bg-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <input
                                                type="date"
                                                name="expirationDate"
                                                value={formData?.expirationDate || ""}
                                                onChange={handleChange}
                                                placeholder="Enter expiration date"
                                                className="text-sm text-gray-400 bg-gray-700 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Enter <span className="font-black">past date</span> to reset the date</p>
                                            <input
                                                type="text"
                                                name="password"
                                                value={formData?.password || ""}
                                                onChange={handleChange}
                                                placeholder="Enter password"
                                                className="text-sm text-gray-400 bg-gray-700 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Type <span className="font-black">&lt;null&gt;</span> to reset the password</p>
                                            <button
                                                className="mt-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                onClick={handleSave}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                        <p className="text-sm text-gray-400">Long URL: {url.longUrl}</p>
                                            <p className="text-sm text-gray-400">Clicks: {url.clicks}</p>
                                            <p className="text-sm text-gray-400">Date: {url.date}</p>
                                            <p className="text-sm text-gray-400">Expiration Date: {url.expirationDate}</p>
                                            <p className="text-sm text-gray-400">Expired: {url.expired.toString()}</p>
                                            <button
                                                className="mt-2 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="text-center">
                                    <div className="bg-white px-2 py-2">
                                        <QRCodeCanvas id={`qr-${url.shortUrl}`} value={`${baseUrl}${url.shortUrl}`} className="mb-2"/>
                                    </div>
                                    <button
                                        className="mt-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                                        onClick={() => copyQRCode(url.shortUrl)}
                                    >
                                        Copy QR Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllUrls;