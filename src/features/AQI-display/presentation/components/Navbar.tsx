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
        <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white py-4 shadow-xl sticky top-0 z-20">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Brand & Welcome Message */}
                <span className="text-2xl -ml-16 font-bold tracking-wide drop-shadow-md">
                    Welcome, {user.name.split(" ")[0]}
                </span>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-10 text-lg font-medium">
                    <Link href="/Creator" className="hover:text-gray-200 transition duration-300">
                        Team Members
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

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed top-16 right-4 z-50 bg-white text-gray-900 shadow-xl rounded-xl w-56 py-4 px-4 flex flex-col gap-3 md:hidden"
                    >
                        <Link
                            href="/Creator"
                            className="py-2 text-center text-lg font-medium rounded-md hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Creators
                        </Link>
                        <Link
                            href="/Profile"
                            className="py-2 text-center text-lg font-medium rounded-md hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </Link>
                        <Link
                            href="/Login"
                            className="mt-2 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-full font-semibold text-center hover:from-green-500 hover:to-blue-600 transition duration-300"
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
