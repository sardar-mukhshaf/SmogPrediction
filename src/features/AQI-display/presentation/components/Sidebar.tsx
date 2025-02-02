"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { SiPodcastindex, SiKdenlive } from "react-icons/si";
import { MdInsights, MdFlutterDash } from "react-icons/md";
import { FaHistory } from "react-icons/fa";


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

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="relative">
            <motion.aside
                initial={{ width: "4vw" }}
                animate={{ width: isOpen ? "15vw" : "4vw" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`bg-gray-900 h-[60vh] top-0 left-0 transition-all duration-300 ${isMobile ? "absolute" : ""}`}
            >
                <div className="flex items-center px-4 py-5 relative">
                    <h1 className={`text-xl font-bold flex gap-2 items-center text-white transition-opacity ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                        <MdFlutterDash /> DESKBOARD
                    </h1>
                </div>


                <motion.nav className="mt-8">
                    <ul className="mt-4 space-y-3">
                        {[
                            { icon: <SiPodcastindex />, text: "AQI Index", link: "/AqiDisplay" },
                            { icon: <MdInsights />, text: "Data Insights", link: "/Analytics" },
                            { icon: <SiKdenlive />, text: "Live Smog", link: "/LiveSmog" },
                            { icon: <FaHistory />, text: "History", link: "/History" },
                        ].map(({ icon, text, link }, index) => (
                            <li key={index} className="flex items-center gap-4 px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer">

                                <Link href={link} className="text-2xl">{icon}</Link>

                                <AnimatePresence>
                                    {isOpen && !isMobile && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-lg"
                                        >
                                            <Link href={link}>{text}</Link>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>
                </motion.nav>


                <div className="mt-6 p-4 text-white">
                    <h2 className={`${isOpen ? "block" : "hidden"} mb-5 text-sm opacity-60`}>Help & Support</h2>
                    <Link href="/help-center" className={`${isOpen ? "block" : "hidden"} block text-lg py-1 hover:text-blue-400`}>
                        Help Center
                    </Link>
                    <Link href="/settings" className={`${isOpen ? "block" : "hidden"} block text-lg py-1 hover:text-blue-400`}>
                        Settings
                    </Link>
                </div>
            </motion.aside>


            <button
                onClick={toggleSidebar}
                className="absolute top-[1vh] left-[6vw] bg-gray-800 text-white p-2 rounded-full shadow-md transition-all duration-300 z-50"
            >
                {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
        </div>
    );
};

export default Sidebar;
