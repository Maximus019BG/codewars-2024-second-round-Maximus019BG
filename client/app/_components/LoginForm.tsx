"use client";
import React, {useState} from 'react';

const LogInFor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: logic
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="email">
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
            <div className="mb-6">
                <label className="block text-white mb-2" htmlFor="password">
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
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
                Log In
            </button>
        </form>
    );
}
export default LogInFor;