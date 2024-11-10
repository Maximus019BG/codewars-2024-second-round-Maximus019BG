import React from 'react';
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-darkGray">
            <header className="flex flex-col items-center justify-center w-full h-[50vh]">
                <h1 className="text-4xl font-bold text-center text-white">ZipURL</h1>
                <p className="text-center text-white">Size matters</p>
                <div className="flex justify-center space-x-4 w-full mt-8">
                    <Link href="/register">
                        <button
                            className="bg-yellow hover:bg-amber-500 text-darkGray font-medium py-2 px-4 rounded transform hover:scale-110 transition-transform duration-300"
                            type="button"
                        >
                            Register
                        </button>
                    </Link>
                    <Link href="/log-in">
                        <button
                            className="bg-yellow hover:bg-amber-500 text-darkGray font-medium py-2 px-6 rounded transform hover:scale-110 transition-transform duration-300"
                            type="button"
                        >
                            Login
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
}
