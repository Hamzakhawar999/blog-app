"use client";

import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const Registration = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const validateForm = () => {
    if (!name) {
      toast.error("First name is required!");
      return false;
    }
    if (!lastName) {
      toast.error("Last name is required!");
      return false;
    }
    if (!email) {
      toast.error("Email is required!");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    return true;
  };


  const submitForm = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateForm()) {
      return;
    }

    try {
      const jsonData = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
      };

      const res = await axios.post(
        "api/auth/register",
        jsonData
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Registration successful!");
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response?.data
          : JSON.stringify(error.response?.data)) ||
        "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center min-h-screen p-6">
      {/* Toaster for displaying toast messages */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Register Here
        </h1>
        <form className="space-y-4" onSubmit={submitForm}>
      
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
         
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
     
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
         
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
