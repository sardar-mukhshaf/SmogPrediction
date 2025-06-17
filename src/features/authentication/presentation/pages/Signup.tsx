"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";

// Particle data type
interface ParticleData {
  left: number;
  top: number;
  width: number;
  height: number;
}

// Particle animation component
const Particles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newParticles: ParticleData[] = Array.from({ length: 50 }).map(() => ({
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
        width: Math.random() * 5 + 3,
        height: Math.random() * 5 + 3,
      }));
      setParticles(newParticles);
    }
  }, []);

  useEffect(() => {
    if (particles.length > 0) {
      const particleElements = gsap.utils.toArray(".particle");
      particleElements.forEach((particle) => {
        gsap.to(particle as Element, {
          y: "random(-60, 60)",
          x: "random(-60, 60)",
          opacity: "random(0.3, 0.8)",
          repeat: -1,
          yoyo: true,
          duration: gsap.utils.random(3, 6),
          ease: "sine.inOut",
        });
      });
    }
  }, [particles]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="particle absolute bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.width,
            height: particle.height,
          }}
        />
      ))}
    </div>
  );
};

// Main Signup page
const Signup: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form validation logic can be added here
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    router.push("/Login");
  };

  return (
    <main className="relative flex items-center justify-center h-screen w-full bg-gradient-to-br from-blue-200 via-purple-300 to-pink-300 overflow-hidden">
      <Particles />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
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
          Create Account
        </motion.h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            type="text"
            placeholder="Enter your username"
            required
          />
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            type="password"
            placeholder="Enter your password"
            required
          />
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            type="password"
            placeholder="Confirm your password"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white font-semibold rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-white/80 text-sm mt-2">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/Login")}
            className="text-pink-800 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </main>
  );
};

export default Signup;
