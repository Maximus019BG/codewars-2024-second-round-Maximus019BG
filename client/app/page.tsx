import React from 'react';

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white text-gray-900">
      <header className="w-full h-full py-6 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-center">ZipURL</h1>
        <p className="text-center text-lg mt-1 text-gray-500">Size matters</p>
      </header>
      <main className="flex flex-col items-center mt-12">
        <h2 className="text-2xl font-medium mb-4">Shorten Your Links Instantly</h2>
        <p className="text-center text-gray-600 mb-8 max-w-md">
          Simplify your links, track their performance, and manage them all in one place.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          type="button"
        >
          Get Started
        </button>
      </main>
    </div>
  );
}