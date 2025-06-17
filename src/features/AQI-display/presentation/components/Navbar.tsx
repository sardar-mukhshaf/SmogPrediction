"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const user = {
    name: "John Doe",
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white py-4 shadow-xl">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Brand & Welcome Message */}
                <span className="text-2xl font-bold tracking-wide drop-shadow-md">
                    Welcome, {user.name.split(" ")[0]}
                </span>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-10 text-lg font-medium">
                    <Link href="/Creator" className="hover:text-gray-200 transition duration-300">
                        Creators
                    </Link>
                    <Link href="/Profile" className="hover:text-gray-200 transition duration-300">
                        Profile
                    </Link>
                </div>

                {/* Register Button */}
                <div className="hidden md:block">
                    <Link
                        href="/Login"
                        className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300"
                    >
                        Register
                    </Link>
                </div>

                {/* Hamburger Icon */}
                <div className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="md:hidden bg-white text-gray-900 px-6 py-4 rounded-b-xl shadow-md"
                    >
                        <Link
                            href="/Creator"
                            className="block py-2 text-lg font-medium hover:text-blue-600 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Creators
                        </Link>
                        <Link
                            href="/Profile"
                            className="block py-2 text-lg font-medium hover:text-blue-600 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </Link>
                        <Link
                            href="/Login"
                            className="mt-4 block w-full text-center bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-full font-semibold hover:from-green-500 hover:to-blue-600 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Register
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
