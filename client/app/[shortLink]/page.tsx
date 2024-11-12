"use client";
import {useParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import axios from "axios";
import {api} from "@/app/api/conf";

const ShortLinkPage = () => {
    const {shortLink} = useParams(); // Get the short link from the URL
    const [requiresPassword, setRequiresPassword] = useState(false); // Password requirement
    const [password, setPassword] = useState(""); // Password
    const [redirectUrl, setRedirectUrl] = useState(""); // Redirect URL

    // Redirect to the long URL
    useEffect(() => {
        const checkPasswordRequirement = async () => {
            try {
                const response = await axios.get(`${api}/url/check/password`, {
                    headers: {
                        "Content-Type": "application/json",
                        "shortUrl": shortLink
                    }
                });
                if (response.data === false) {
                    const longUrlResponse = await axios.get(`${api}/url/get/${shortLink}`);
                    setRedirectUrl(longUrlResponse.data); //if no password required set the redirect URL
                } else {
                    setRequiresPassword(true); // Set the password requirement
                }
            } catch (error: unknown) {
                console.error(error);
                window.location.href = "/not/found";
                //why does notFound() not work?
            }
        };
        checkPasswordRequirement();
    }, [shortLink]);

    const handlePasswordSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${api}/url/get/${shortLink}`, {
                headers: {
                    "Content-Type": "application/json",
                    "password": password
                }
            });
            setRedirectUrl(response.data); // Set the redirect URL
        } catch (error) {
            console.error(error);
            alert("Invalid password or link is expired");
        }
    };

    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl; // Redirect to the long URL
        }
    }, [redirectUrl]);

    return (
        // Най-центрираната форма, която съм правил
        <div className="items-center justify-center text-center align-middle content-center justify-items-center justify-self-center h-full">
            {requiresPassword ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">This URL is password protected</h1>
                    <form onSubmit={handlePasswordSubmit} className="text-center">
                        <h2 className="text-xl font-bold mb-4">Enter Password</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 border-none rounded rounded-b-md text-black"
                            required
                        />
                        <button type="submit" className=" ml-5 button p-2 bg-yellow text-black rounded hover:bg-amber-500">
                            Submit
                        </button>
                    </form>
                </div>
            ) : null}
        </div>
    );
};

export default ShortLinkPage;