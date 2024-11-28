"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function CodeSoal() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/validate-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    setMessage(data.message);
    setMessageType(data.status); // Set the message type based on status
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600">
        Find The Password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700"
          >
            Enter Password:
          </label>
          <input
            type="text"
            id="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the decrypted password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        <Link href="/sourceCode" className="text-blue-500">
          Souce Code
        </Link>
      </form>
      {message && (
        <p
          className={`mt-4 text-lg text-center font-medium ${
            messageType === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
