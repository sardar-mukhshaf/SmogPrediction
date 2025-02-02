"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";



const Particles = () => {
  const [particles, setParticles] = useState(
    Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 1.5 + 0.5,
    }))
  );

  useEffect(() => {
    const updateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          y: p.y + p.speed > window.innerHeight ? 0 : p.y + p.speed,
        }))
      );
    };

    const interval = setInterval(updateParticles, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [p.y, p.y + 20] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute bg-blue-400 rounded-full opacity-30"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};




const Signup: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");



  const handleSubmit = async (e: React.FormEvent) => {
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


          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <label htmlFor="username" className="text-gray-300 font-semibold">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              placeholder="Enter your username"
              required
            />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <label htmlFor="email" className="text-gray-300 font-semibold">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <label htmlFor="password" className="text-gray-300 font-semibold">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <label
              htmlFor="confirmPassword"
              className="text-gray-300 font-semibold"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="password"
              placeholder="Confirm Your Password"
              required
            />
          </motion.div>


          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </main>
  );

};



export default Signup;
