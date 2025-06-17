"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { SiPodcastindex, SiKdenlive } from "react-icons/si";
import { MdInsights, MdFlutterDash } from "react-icons/md";
import { FaHammer, FaHistory } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <motion.aside
                initial={{ width: "4rem" }}
                animate={{ width: isOpen ? "14rem" : "4rem" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`bg-white border-r border-gray-200 shadow-md h-screen top-0 left-0 fixed z-40 ${isMobile ? "absolute" : ""} rounded-r-xl`}
            >
                <div className="flex items-center justify-between px-4 py-4">
                    <motion.div
                        className={`flex items-center transition-opacity ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}
                    >    <span className="ml-2 text-lg font-semibold text-gray-800"></span>
                    </motion.div>

                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>

                <nav className="mt-6">
                    <ul className="space-y-4">
                        {[
                            { icon: <FaHammer />, text: "Predictions", link: "/Predictions" },
                            { icon: <SiPodcastindex />, text: "Aqi Display", link: "/AqiDisplay" },
                            { icon: <MdInsights />, text: "Data Insights", link: "/Analytics" },
                            { icon: <SiKdenlive />, text: "Live Smog", link: "/LiveSmog" },
                            { icon: <FaHistory />, text: "History", link: "/History" },
                        ].map(({ icon, text, link }, index) => (
                            <li key={index} className="flex items-center gap-4 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-all duration-300">
                                <Link href={link} className="text-2xl text-blue-400">
                                    {icon}
                                </Link>
                                <AnimatePresence>
                                    {isOpen && !isMobile && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-base font-medium text-gray-700"
                                        >
                                            <Link href={link}>{text}</Link>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-10 px-6 text-gray-600">
                    {isOpen && (
                        <>
                            <h2 className="mb-2 text-xs uppercase tracking-wider text-gray-400">Help & Support</h2>
                            <Link href="/help-center" className="block text-sm py-1 hover:text-blue-500 transition-colors">
                                Help Center
                            </Link>
                            <Link href="/settings" className="block text-sm py-1 hover:text-blue-500 transition-colors">
                                Settings
                            </Link>
                        </>
                    )}
                </div>
            </motion.aside>
        </div>
    );
};

export default Sidebar;
