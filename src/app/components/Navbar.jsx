
"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div className="text-2xl font-extrabold text-white hover:text-yellow-300 transition duration-300 transform hover:scale-110">
          <Link href="/">My App</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            href="/register"
            className="text-lg font-semibold text-white hover:text-yellow-300 transition duration-300 transform hover:-translate-y-1"
          >
       register
          </Link>
          <Link
            href="/login"
            className="text-lg font-semibold text-white hover:text-green-300 transition duration-300 transform hover:-translate-y-1"
          >
            Login
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
