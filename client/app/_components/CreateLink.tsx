"use client";
import React, { useState } from "react";
import axios from "axios";
import { api } from "@/app/api/conf";

const CreateLink = () => {
    const [password, setPassword] = useState<string|undefined>(""); // Link password
    const [url, setUrl] = useState<string>(""); // Long URL
    const [customLink, setCustomLink] = useState<string|undefined>(""); // Custom link

    const createLink = async () => {
        if(password === "" || url === ""){

        }
        const data = {
            url: url,
            password: password,
            customShortUrl: customLink
        }
        axios.post(`${api}/url/create`, data, {
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="mx-auto p-4 w-1/2">
            <div className="input-group flex items-center mb-4">
                <span className="prefix text-gray-500 bg-white p-2 border border-gray-300 rounded-l">http://localhost:3000/</span>
                <input
                    className="input w-full p-2 border-t border-r border-b border-gray-300 rounded-r text-black"
                    value={customLink}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password for the link   *optional"
                />
            </div>
            <button className="button w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => createLink()}>Create Link</button>
        </div>
    );
}

export default CreateLink;