"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import {api} from "@/app/api/conf";
import Cookies from "js-cookie";
import {UrlType, UrlTypeEdit} from "@/app/type/types";
import {QRCodeCanvas} from "qrcode.react";
import DatePicker from "react-datepicker";

const AllUrls = () => {
    const [urls, setUrls] = useState<UrlType[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<UrlTypeEdit | null>(null);
    const [oldShortUrl, setOldShortUrl] = useState<string>("");
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

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

    const handleDateChange = (date: Date | null) => {
        if (formData) {
            setFormData({...formData, expirationDate: date ? date.toISOString().split('T')[0] : ""});
        }
    };

    const handleCopy = (index: number) => {
        const url = urls[index];
        navigator.clipboard.writeText(`${baseUrl}${url.shortUrl}`);
    }
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

    const handleDelete = (index: number) => {
        setDeleteIndex(index);
        setShowDeletePopup(true);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            const url = urls[deleteIndex];
            axios.delete(`${api}/url/delete/${url.shortUrl}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": Cookies.get("accessToken"),
                }
            }).then(() => {
                setUrls(urls.filter((_, index) => index !== deleteIndex));
                setShowDeletePopup(false);
                setDeleteIndex(null);
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    return (
        <div className="min-h-full p-4 text-yellow bg-darkGrey">
            <h1 className="text-2xl mb-4 font-semibold">All URLs</h1>
            {urls.map((url, index) => (
                <div key={index} className="border-b border-gray-700">
                    <div
                        className="w-full text-left p-4 bg-darkGrey hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => toggleAccordion(index)}
                    >
                        {baseUrl}{url.shortUrl}

                    </div>
                    <div
                        className={`overflow-hidden transition-max-height ease-in-out ${activeIndex === index ? 'max-h-full' : 'max-h-0'}`}
                    >
                        <div className="p-4 bg-darkGrey shadow-md rounded-md">
                            <div className="flex justify-between items-center mb-4 w-full">
                                <div className="w-1/2">
                                    {editIndex === index ? (
                                        <div className="space-y-4 w-full">
                                            <p className="text-sm text-gray-400">Long URL: {url.longUrl}</p>
                                            <div className="flex items-center space-x-2 w-full">
                                                <label className="text-sm w-24 text-gray-400" htmlFor="shortUrl">Short URL:</label>
                                                <span className="text-sm text-gray-400">{baseUrl}</span>
                                                <input
                                                    type="text"
                                                    id="shortUrl"
                                                    name="shortUrl"
                                                    value={formData?.shortUrl || ""}
                                                    onChange={handleChange}
                                                    placeholder="Enter short URL"
                                                    className="text-sm text-gray-400 bg-darkGray p-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow"
                                                />
                                            </div>
                                            <div className="flex w-full">
                                                <label className="text-sm w-24 text-gray-400" htmlFor="expirationDate">Expiration Date:</label>
                                                <DatePicker
                                                    selected={formData?.expirationDate ? new Date(formData.expirationDate) : null}
                                                    onChange={handleDateChange}
                                                    placeholderText="Select new expiration date"
                                                    dateFormat="yyyy/MM/dd"
                                                    className="text-sm text-gray-400 bg-darkGray p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Click on <span className="font-black">the clear button</span> to remove the expiration date</p>
                                            <div className="flex w-full">
                                                <label className="text-sm w-24 text-gray-400" htmlFor="password">Password:</label>
                                                <input
                                                    type="text"
                                                    id="password"
                                                    name="password"
                                                    value={formData?.password || ""}
                                                    onChange={handleChange}
                                                    placeholder="Enter password"
                                                    className="text-sm text-gray-400 bg-darkGray p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Type <span className="font-black">&lt;null&gt;</span> to reset the password</p>
                                            <div className="flex w-full">
                                                <label className="text-sm w-24 text-gray-400" htmlFor="maxClicks">Max Clicks:</label>
                                                <input
                                                    type="number"
                                                    id="maxClicks"
                                                    name="maxClicks"
                                                    value={formData?.maxClicks || ""}
                                                    onChange={handleChange}
                                                    placeholder="Enter max clicks"
                                                    className="text-sm text-gray-400 bg-darkGray p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Type <span className="font-black">-1</span> to remove the max clicks</p>
                                            <p className="text-xs text-gray-500 mt-1">Leave untouched the fields you don&apos;t want to change</p>
                                            <button
                                                className="mt-2 px-3 py-2 bg-yellow text-black rounded hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow"
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
                                            {url.expirationDate && (
                                                <p className="text-sm text-gray-400">Expiration Date: {url.expirationDate}</p>
                                            )}
                                            <p className="text-sm text-gray-400">Expired: {url.expired.toString()}</p>
                                            {url.maxClicks && url.maxClicks != -1 && (
                                                <p className="text-sm text-gray-400">Max Clicks: {url.maxClicks}</p>
                                            )}
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="mt-2 px-3 py-2 bg-yellow text-black rounded hover:bg-yellow-600 transition-colors duration-200"
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="mt-2 px-3 py-2 bg-yellow text-black rounded hover:bg-yellow-600 transition-colors duration-200"
                                                    onClick={() => handleCopy(index)}
                                                >
                                                    Copy Short URL
                                                </button>
                                                <button
                                                    className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="text-center -mt-4">
                                    <div className="bg-white px-2 py-2">
                                        <QRCodeCanvas id={`qr-${url.shortUrl}`} value={`${baseUrl}${url.shortUrl}`} className="mb-2"/>
                                    </div>
                                    <button
                                        className="mt-2 px-3 py-2 bg-yellow text-black rounded hover:bg-amber-600 transition-colors duration-200"
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
            {showDeletePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-darkGray px-6 py-4 rounded-md">
                        <p className="text-yellow mb-4">Are you sure you want to delete this URL?</p>
                        <div className="flex justify-end">
                            <button
                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 mr-2"
                                onClick={confirmDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUrls;