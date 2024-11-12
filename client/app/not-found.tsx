import React from 'react';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-dvh bg-darkGray text-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl mb-4">Page Not Found</h2>
            <p className="mb-8">Sorry, the page you are looking for does not exist.</p>
            <Link href="/">
                <p className="px-4 py-2 bg-yellow text-black rounded hover:bg-amber-500 transition duration-300">
                    Go back to Home
                </p>
            </Link>
        </div>
    );
};

export default NotFoundPage;