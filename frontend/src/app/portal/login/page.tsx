"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../api/api";

export default function AdminLogin() {
  const router = useRouter();

  // User input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Feedback state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Authentication handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login for:", email); // Debug log

      // Call the backend API
      const data = await api.auth.login({ email, password });

      console.log("Login successful:", data); // Debug log

      // Save the token if it exists
      if (data.token) {
        localStorage.setItem("jwt_token", data.token);
        // Redirect to the dashboard
        router.push("/portal/dashboard");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err: any) {
      console.error("Login Error:", err); // Debug log

      // Handle specific error codes
      if (err.response?.status === 429) {
        setError("Too many attempts. Please wait a minute.");
      } else if (err.response?.status === 403 || err.response?.status === 401) {
        setError("Invalid credentials.");
      } else {
        setError("Connection failed. Is the backend running?");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stone-900/20 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-sm z-10">
        <div className="mb-6 text-center">
          <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
            L. Kairns
          </Link>
          <p className="text-stone-500 text-xs mt-2 uppercase tracking-widest font-mono">
            System Access
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-stone-800 p-8 rounded-lg shadow-2xl">
          {/* Form handler */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 p-3 rounded text-red-400 text-xs font-mono text-center">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase font-mono">Username</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Updates state when you type
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors font-mono"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase font-mono">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Updates state when you type
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors font-mono"
                placeholder="........"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 bg-white text-black py-3 rounded text-sm font-bold hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Authenticate"}
            </button>
          </form>
        </div>

        <p className="text-center text-stone-600 text-xs mt-6">
          Authorized personnel only. <br /> Access attempts are logged.
        </p>
      </div>
    </div>
  );
}