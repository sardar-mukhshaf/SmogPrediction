"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const user = {
    name: "Sardar Mukhshaf",
    avatar: "/profile-placeholder.png", 
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                
                <span className="text-xl font-semibold">Welcome, {user.name.split(" ")[0]}</span>

               
                <div className="hidden md:flex space-x-6">
                    <Link href="/Creator" className="hover:text-gray-400">
                        Creators
                    </Link>
                    <Link href="/Profile" className="hover:text-gray-400">
                        Profile
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-gray-600"
                    />
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-gray-800 py-4 px-6 mt-2 rounded-lg"
                    >
                        <Link
                            href="/Creator"
                            className="block py-2 hover:text-gray-400"
                            onClick={() => setIsOpen(false)}
                        >
                            Creators
                        </Link>
                        <Link
                            href="/Profile"
                            className="block py-2 hover:text-gray-400"
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
