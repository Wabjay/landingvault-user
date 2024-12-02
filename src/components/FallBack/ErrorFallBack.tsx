import React from "react";
import Link from "next/link";

const ErrorFallback: React.FC<{ errorMessage?: string }> = ({ errorMessage }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-red-500 mb-4">Something Went Wrong</h1>
        <p className="text-gray-700">
          {errorMessage || "We encountered an unexpected issue. Please try again later."}
        </p>
        <div className="mt-6 mx-auto">
          <Link href="/">
            <a className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
              Go to Homepage
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
