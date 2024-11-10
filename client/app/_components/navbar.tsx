"use client";
import React, {useEffect} from 'react';
import {SessionCheck} from "@/app/funcs/funcs";
import Cookies from "js-cookie";
import Link from "next/link";
import axios from "axios";
import {api} from "@/app/api/conf";

const NavBar = () => {

    //Session check
    useEffect(() => {
        if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
            SessionCheck();//Check if session is valid
        }
        else{
            if (typeof window !== "undefined") {
                window.location.href = '/log-in'; //Redirect to login page if no session
            }
        }
    }, []);

    const logout = () => {
        const data = {
            accessToken: Cookies.get('accessToken'),
            refreshToken: Cookies.get('refreshToken')
        }
        axios.put(`${api}/auth/logout`, data , {
            headers: {
                "Content-Type": "application/json",
            }
        })
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        if (typeof window !== "undefined") {
            window.location.href = '/log-in';
        }
    }
    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-darkGray flex items-center justify-between px-4">
            <div className="flex items-center">
                <h1 className="text-yellow">ZipURL</h1>
            </div>
            <div className="flex items-center">
                <Link href="/links" className="text-yellow hover:bg-gray-700 hover:text-gray-200 rounded-lg px-4 py-2">Links</Link>
                <button onClick={logout} className="text-yellow hover:bg-gray-700 hover:text-gray-200 rounded-lg px-4 py-2">Logout</button>
            </div>
        </div>
    );
}
export default NavBar;