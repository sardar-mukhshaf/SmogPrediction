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
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        repeat: -1,
        duration: 4,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    router.push("/AqiDisplay");
  };

  return (
    <main className="relative flex items-center justify-center h-screen w-full bg-gradient-to-br from-pink-200 via-purple-300 to-blue-400 overflow-hidden">
      
      <div ref={starsRef} className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star absolute bg-gradient-to-r from-pink-400 to-purple-500 opacity-70 rounded-full"
            style={{
              width: `${Math.random() * 4 + 3}px`,
              height: `${Math.random() * 4 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 w-[90%] max-w-md z-10 flex flex-col gap-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-4xl font-extrabold text-white drop-shadow-lg"
        >
          Welcome Back!
        </motion.h1>

        <form onSubmit={formHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white font-medium">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white font-medium">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between items-center text-white/80 text-sm mt-2">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-purple-500 focus:ring-purple-500 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2">Remember me</label>
            </div>
            <a href="#" className="hover:text-pink-300 transition">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white font-semibold rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-white/80 text-sm mt-2">
            Don&apos;t have an account?{" "}
            <span
              className="text-pink-800 hover:underline cursor-pointer"
              onClick={() => router.push("/Signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </motion.div>
    </main>
  );
};

export default Login;
