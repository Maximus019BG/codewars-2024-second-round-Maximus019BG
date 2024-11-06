"use client";
import React, {useEffect} from 'react';
import {SessionCheck} from "@/app/funcs/funcs";
import Cookies from "js-cookie";

const NavBar = () => {

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
        <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center">
                <h1 className="text-white">ZipURL</h1>
            </div>
            <div className="flex items-center">
                <a href="/links" className="text-white hover:bg-gray-700 hover:text-gray-200 rounded-lg px-4 py-2">Links</a>
                <a href="/settings" className="text-white hover:bg-gray-700 hover:text-gray-200 rounded-lg px-4 py-2">Settings</a>
            </div>
        </div>
    );
}
export default NavBar;