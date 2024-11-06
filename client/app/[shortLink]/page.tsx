"use client";
import {useParams} from 'next/navigation';
import {useEffect} from 'react';
import axios from "axios";
import {api} from "@/app/api/conf";

const ShortLinkPage = () => {
    const {shortLink} = useParams(); // Get the short link from the URL

    // Redirect to the long URL
    useEffect(() => {
        //Get the long URL from the short link
        const Redirect = async () => {
            try {
                const response = await axios.get(`${api}/url/get/${shortLink}`);
                window.location.href = response.data; // Redirect to the long URL
            } catch (error) {
                console.log(error);
                window.location.href = "/"; // Redirect to the home page if the short link is not found
            }
        };
        Redirect();
    }, [shortLink]);

    return null;
};

export default ShortLinkPage;