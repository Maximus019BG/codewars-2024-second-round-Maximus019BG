"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "@/app/api/conf";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; 

const CreateLink = () => {
    const [password, setPassword] = useState<string | null>(""); // Link password
    const [url, setUrl] = useState<string>(""); // Long URL
    const [customLink, setCustomLink] = useState<string | null>(""); // Custom link
    const [expiration, setExpiration] = useState<Date | null>(null); // Expiration date
    const [length, setLength] = useState<number>(5); // Length
    const [maxClicks, setMaxClicks] = useState<number | null>(null); // Max clicks
    const [popup, setPopup] = useState<boolean>(false); // Popup state
    const [popupMessage, setPopupMessage] = useState<string>(""); // Popup message
    const [baseUrl, setBaseUrl] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(`${window.location.protocol}//${window.location.host}/`);
        }
    }, []);

    // Date conversion
    const formatExpirationDate = (date: Date | null) => {
        if (!date) return null;
        return format(date, "MM/dd/yyyy"); // Format the date to MM/dd/YYYY
    };

    // Create a new link
    const createLink = () => {
        if (password === "") {
            setPassword(null);
        }

        if (length < 5 && length !== 0 || length > 10 && length !== 0) {
            setLength(0);
            alert("Length should be between 5 and 10");
            return;
        }

        const data = {
            url: url,
            password: password,
            customShortUrl: customLink,
            expirationDate: formatExpirationDate(expiration)?.toString, // Convert the date before sending
            length: length >= 5 && length <= 10 ? length : 0,
            maxClicks: maxClicks ? maxClicks : -1,
        };

        axios.post(`${api}/url/create`, data, {
            headers: {
                "Content-Type": "application/json",
                "authorization": Cookies.get("accessToken"),
            }
        }).then((response) => {
            setPopup(true);
            setPopupMessage(response.data);
            console.log(response.data);
        }).catch((error) => {
            setPopup(true);
            setPopupMessage(error.response.data);
            console.log(error);
        });
    };

    return (
        <div className="mx-auto p-4 w-1/2">
            <div className="input-group flex items-center mb-4">
                <span className="prefix text-gray-500 bg-darkGray p-2 border border-gray-300 rounded-l">{baseUrl}</span>
                <input
                    className="input w-full p-2 border-t border-r border-b border-gray-300 rounded-r text-white bg-darkGray"
                    value={customLink || ""}
                    onChange={(e) => setCustomLink(e.target.value)}
                    type="text"
                    placeholder="Custom link  *optional"
                />
            </div>
            <div className="input-group flex items-center mb-4">
                <input
                    className="input w-full p-2 border border-gray-300 rounded text-white bg-darkGray"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <div className="input-group flex items-center mb-4">
                <input
                    className="input w-full p-2 border border-gray-300 rounded text-white bg-darkGray"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password for the link   *optional"
                />
            </div>
            <div className="input-group flex items-center mb-4 relative">
                <DatePicker
                    className="input w-full p-3 pl-4 pr-12 border border-gray-300 rounded text-white bg-darkGray focus:outline-none focus:ring-2 focus:ring-yellow transition-all"
                    selected={expiration}
                    onChange={(date: Date | null) => setExpiration(date)}
                    placeholderText="YYYY/MM/DD"
                    dateFormat="yyyy/MM/dd" // Display format
                />
            </div>
            <div className="input-group flex items-center mb-4">
                <label className="text-gray-500 mr-2">Length: {length}</label>
                <input
                    className="w-full"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    type="range"
                    min="5"
                    max="10"
                    style={{ accentColor: "yellow" }}
                />
            </div>
            <div className="input-group flex items-center mb-4">
                <input
                    className="input w-full p-2 border border-gray-300 rounded text-white bg-darkGray"
                    value={maxClicks || ""}
                    onChange={(e) => setMaxClicks(Number(e.target.value))}
                    type="number"
                    placeholder="Max clicks *optional"
                />
            </div>
            <button
                className="button w-full p-2 bg-yellow text-black rounded hover:bg-yellow-600"
                onClick={createLink}
            >
                Create Link
            </button>
            {popup && (
                <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-darkGray p-4 rounded shadow-lg relative">
                        <button
                            className="absolute text-xl top-2 right-2 text-white"
                            onClick={() => {
                                setPopup(false);
                                window.location.reload();
                            }}
                        >
                            &times;
                        </button>
                        {popupMessage.includes("error") ? (
                            <h3 className="text-red-500">{popupMessage}</h3>
                        ) : (
                            <div className="px-3 py-2">
                                <p>Your short link is: {baseUrl}{popupMessage}</p>
                                <button
                                    className="button w-full p-2 bg-yellow text-white rounded hover:bg-yellow-600 mt-2"
                                    onClick={() => navigator.clipboard.writeText(baseUrl + popupMessage)}
                                >
                                    Copy
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateLink;
