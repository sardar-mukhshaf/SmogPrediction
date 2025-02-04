"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";

const Particles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const particles = gsap.utils.toArray(".particle");
    particles.forEach((particle) => {
      gsap.to(particle as Element, {
        y: "random(-50, 70)",
        x: "random(-50, 50)",
        opacity: "random(0.3, 0.7)",
        repeat: -1,
        yoyo: true,
        duration: gsap.utils.random(3, 6),
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="particle absolute bg-blue-400 rounded-full opacity-30"
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
          }}
        />
      ))}
    </div>
  );
};

const Signup: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    router.push("/Login");
  };

  return (
    <main className="relative flex items-center justify-center h-screen w-full bg-zinc-900 overflow-hidden">
      <Particles />
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
          Create Account
        </motion.h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter your username"
            required
          />
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter your password"
            required
          />
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Confirm your password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account? {" "}
          <span
            onClick={() => router.push("/Login")}
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </main>
  );
};

export default Signup;
