import React from 'react';
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-darkGray text-white bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
            <header className="w-full py-6 border-b border-gray-700 bg-darkGray bg-opacity-75">
                <h1 className="text-4xl font-bold text-center">ZipURL</h1>
                <p className="text-center text-lg mt-1 text-gray-400">Size matters</p>
            </header>
            <main className="flex flex-col items-center mt-12 bg-darkGray bg-opacity-75 p-6 rounded">
                <h2 className="text-2xl font-medium mb-4">Shorten Your Links Instantly</h2>
                <p className="text-center text-gray-500 mb-8 max-w-md">
                    Simplify your links, track their performance, and manage them all in one place.
                </p>
                <p className="text-center text-gray-500 mb-8 max-w-md">
                    Our URL shortener is designed to be fast, reliable, and easy to use. Whether you are a business or an individual, you can benefit from our service.
                </p>
                <p className="text-center text-gray-500 mb-8 max-w-md">
                    Join us today and start shortening your URLs with ZipURL. Experience the convenience and efficiency of our platform.
                </p>
                <Link href="/register">
                    <button
                        className="bg-yellow hover:bg-yellow text-darkGray font-medium py-2 px-4 rounded z-50"
                        type="button"
                    >
                        Get Started
                    </button>
                </Link>
            </main>
        </div>
    );
}