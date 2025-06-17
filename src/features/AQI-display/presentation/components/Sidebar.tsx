"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { SiPodcastindex, SiKdenlive } from "react-icons/si";
import { MdInsights } from "react-icons/md";
import { FaHammer, FaHistory } from "react-icons/fa";

const navItems = [
  { icon: <FaHammer />, text: "Predictions", link: "/Predictions" },
  { icon: <SiPodcastindex />, text: "Aqi Display", link: "/AqiDisplay" },
  { icon: <MdInsights />, text: "Data Insights", link: "/Analytics" },
  { icon: <SiKdenlive />, text: "Live Smog", link: "/LiveSmog" },
  { icon: <FaHistory />, text: "History", link: "/History" },
];

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      {/* Mobile View */}
      {isMobile && (
        <div className="fixed mt-16 top-4 left-4 z-50">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-500">
            {sidebarOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      )}

      {/* Mobile Full Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.4 }}
          className="fixed mt-16 top-0 left-0 z-40 h-screen w-60 bg-white shadow-lg px-4 py-6"
        >
          <ul className="space-y-6 mt-10">
            {navItems.map(({ icon, text, link }, idx) => (
              <li key={idx} className="flex items-center gap-4 text-gray-700 hover:bg-blue-50 p-2 rounded cursor-pointer">
                <Link href={link} className="text-2xl text-blue-400 flex items-center gap-3">
                  {icon}
                  <span className="text-base">{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <motion.aside
          animate={{ width: sidebarOpen ? "14rem" : "4rem" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 h-screen bg-white border-r shadow-md flex flex-col rounded-r-xl z-40"
        >
          <div className="flex items-center justify-between p-4">
            {sidebarOpen && <span className="text-lg font-semibold text-gray-800">Menu</span>}
            <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-500">
              {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
          <nav className="mt-6 flex-1">
            <ul className="space-y-4">
              {navItems.map(({ icon, text, link }, idx) => (
                <li key={idx} className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-all duration-300">
                  <Link href={link} className="text-2xl text-blue-400">
                    {icon}
                  </Link>
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 text-base font-medium"
                      >
                        {text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      )}
    </>
  );
};

export default Sidebar;
