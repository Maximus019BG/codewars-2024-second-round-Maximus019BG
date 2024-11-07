"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "@/app/api/conf";
import Cookies from "js-cookie";

const CreateLink = () => {
    const [password, setPassword] = useState<string | null>(""); // Link password
    const [url, setUrl] = useState<string>(""); // Long URL
    const [customLink, setCustomLink] = useState<string | null>(""); // Custom link
    const [experation, setExperation] = useState<string | null>(""); // Experation date
    const [popup, setPopup] = useState<boolean>(false); // Popup state
    const [popupMessage, setPopupMessage] = useState<string>(""); // Popup message
    const [baseUrl, setBaseUrl] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(`${window.location.protocol}//${window.location.host}/`);
        }
    }, []);

    // Create a new link
    const createLink = () => {
        if (password === "") {
            setPassword(null);
        }
        const data = {
            url: url,
            password: password,
            customShortUrl: customLink,
            expirationDate: experation // Include expiration date
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
                <span className="prefix text-gray-500 bg-white p-2 border border-gray-300 rounded-l">{baseUrl}</span>
                <input
                    className="input w-full p-2 border-t border-r border-b border-gray-300 rounded-r text-black"
                    value={customLink || ""}
                    onChange={(e) => setCustomLink(e.target.value)}
                    type="text"
                    placeholder="Custom link  *optional"
                />
            </div>
            <div className="input-group flex items-center mb-4">
                <input
                    className="input w-full p-2 border border-gray-300 rounded text-black"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <div className="input-group flex items-center mb-4">
                <input
                    className="input w-full p-2 border border-gray-300 rounded text-black"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password for the link   *optional"
                />
            </div>
            <div className="input-group flex items-center mb-4">
                <input
                    className="input w-full p-2 border border-gray-300 rounded text-black"
                    value={experation || ""}
                    onChange={(e) => setExperation(e.target.value)}
                    type="date"
                    placeholder="*optional"
                />
            </div>
            <button className="button w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => createLink()}>Create Link</button>
            {popup && (
                <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-background p-4 rounded shadow-lg relative">
                        <button
                            className="absolute text-xl top-2 right-2 text-white"
                            onClick={() => setPopup(false)}
                        >
                            &times;
                        </button>
                        {popupMessage.includes("error") ? (
                            <h3 className="text-red-500">{popupMessage}</h3>
                        ) : (
                            <div className="px-3 py-2">
                                <p>Your short link is:{baseUrl}{popupMessage}</p>
                                <button
                                    className="button w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2"
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
}

export default CreateLink;