"use client";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {api} from "@/app/api/conf";
import Cookies from "js-cookie";
import {SessionCheckAuth} from "@/app/funcs/funcs";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        axios.post(`${api}/auth/register`, {email, password}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            Cookies.set('accessToken', response.data.accessToken, {secure: true});
            Cookies.set('refreshToken', response.data.refreshToken, {secure: true});
            window.location.href = '/links';
        }).catch((error) => {
            console.log(error);
        })
    };
    useEffect(() => {
        if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
            SessionCheckAuth();
        }
    }, []);

    return (
        <form onSubmit={handleRegister} className="bg-darkGray p-8 rounded w-full max-w-md">
            <div className="mb-4">
                <label className="block text-yellow mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-yellow mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border rounded text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-yellow mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 border rounded text-black"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-yellow text-black font-medium py-2 px-4 rounded hover:bg-yellow-600"
            >
                Register
            </button>
        </form>
    );
}
export default RegisterForm;