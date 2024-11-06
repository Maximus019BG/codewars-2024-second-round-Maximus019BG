"use client";
import React, {useEffect} from 'react';
import {SessionCheck} from "@/app/funcs/funcs";
import Cookies from "js-cookie";

const SideBar = () => {

    //Session check
    useEffect(() => {
        if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
            SessionCheck();//Check if session is valid
        }
        else{
            window.location.href = '/log-in'; //Redirect to login page if no session
        }
    }, []);
    return (
        <div className="w-64 h-full bg-gray-800">
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
                <h1 className="text-white">ZipURL</h1>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <a href="/links" className="text-white hover:bg-gray-700 hover:text-gray-200 w-full py-2 text-center">Links</a>
                <a href="/settings" className="text-white hover:bg-gray-700 hover:text-gray-200 w-full py-2 text-center">Settings</a>
            </div>
        </div>
    );
}
export default SideBar;