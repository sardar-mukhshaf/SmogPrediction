"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    router.push("/AqiDisplay");
  };

  return (
    <main className="flex items-center justify-center h-screen w-full bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-zinc-800 shadow-lg rounded-xl overflow-hidden w-[90%] max-w-md p-6"
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

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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
              placeholder="Enter your email"
              required
            />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
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
              placeholder="Enter your password"
              required
            />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-between text-gray-400 text-sm"
          >
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2">
                Remember me
              </label>
            </div>
            <a href="#" className="hover:text-blue-500 transition">
              Forgot password?
            </a>
          </motion.div>


          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
};

export default Login;
