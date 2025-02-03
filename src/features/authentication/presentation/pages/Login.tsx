"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (starsRef.current) {
      const stars = starsRef.current.querySelectorAll(".star");
      gsap.to(stars, {
        y: "random(-10, 10)",
        x: "random(-10, 10)",
        repeat: -1,
        duration: 2,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    router.push("/AqiDisplay");
  };

  return (
    <main className="relative flex items-center justify-center h-screen w-full bg-zinc-900 overflow-hidden">
      {/* Animated Stars */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star absolute bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-zinc-800 shadow-lg rounded-xl overflow-hidden w-[90%] max-w-md p-6 relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center font-bold text-3xl text-white"
        >
          Welcome Back!
        </motion.h1>

        <form onSubmit={formHandler} className="mt-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-300 font-semibold">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-300 font-semibold">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2">Remember me</label>
            </div>
            <a href="#" className="hover:text-blue-500 transition">
              Forgot password?
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Login
            </button>

            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => router.push("/Signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default Login;