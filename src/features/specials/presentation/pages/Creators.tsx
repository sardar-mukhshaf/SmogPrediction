"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { admins } from "../components/Info";
import { FaUserSecret, FaUserTie } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Creators: React.FC = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const floatingOrbsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        gsap.to(bgRef.current, {
            background: "linear-gradient(135deg, #f4f4f4, #eaeaea)",
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        floatingOrbsRef.current.forEach((orb) => {
            gsap.to(orb, {
                y: () => Math.random() * 30 - 15,
                x: () => Math.random() * 30 - 15,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });
    }, []);

    return (
        <div
            ref={bgRef}
            className="min-h-screen flex flex-col items-center justify-start p-8 relative overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200"
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    ref={(el) => { floatingOrbsRef.current[i] = el as HTMLDivElement; }}
                    className="absolute w-16 h-16 bg-gray-300 rounded-full opacity-10"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        filter: "blur(40px)",
                    }}
                />
            ))}

            <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 z-10 text-center"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Our Professional Team Members
            </motion.h1>

            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 z-10">
                <AnimatePresence>
                    {admins.map((admin, index) => (
                        <motion.div
                            key={admin.id}
                            initial={{ opacity: 0, y: 80, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col overflow-hidden"
                        >
                            <div className="relative h-48 flex items-center justify-center bg-gray-100">
                                {index === 1 ? (
                                    <FaUserTie className="text-gray-500 text-6xl" /> // Icon for 2nd admin
                                ) : index === 2 ? (
                                    <FaUserSecret className="text-gray-500 text-6xl" /> // Icon for 3rd admin
                                ) : (
                                    <motion.img
                                        src={admin.profilePicture}
                                        alt={admin.name}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1 }}
                                    />
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{admin.name}</h2>
                                <p className="text-gray-600 text-sm leading-relaxed flex-1 overflow-y-auto">
                                    {admin.description}
                                </p>
                                <div className="flex items-center space-x-3 mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <a
                                        href={`mailto:${admin.email}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {admin.email}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div
                className="w-full max-w-5xl mt-16 z-10"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <motion.h2
                        className="text-3xl font-semibold text-gray-800 mb-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Smog Prediction System (ML Powered)
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 text-base leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Our system tracks critical pollutants like PM2.5, PM10, NO₂, SO₂, and CO, alongside weather variables to forecast air quality. With real-time sensor data, heatmaps, and predictive modeling, it informs public health and urban policy decisions. Features include dynamic AQI charts, uncertainty modeling, and geo-specific forecasting.
                    </motion.p>
                    <motion.ul
                        className="mt-6 list-disc list-inside text-gray-700 space-y-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <li>
                            <strong>Real-time Monitoring:</strong> Live updates from distributed IoT sensors across the city.
                        </li>
                        <li>
                            <strong>Interactive Heatmaps:</strong> Visualize pollution hotspots and trends over time.
                        </li>
                        <li>
                            <strong>Predictive Analytics:</strong> Machine learning models forecast AQI and pollutant spikes.
                        </li>
                        <li>
                            <strong>Weather Integration:</strong> Correlates meteorological data with air quality for improved accuracy.
                        </li>
                        <li>
                            <strong>Public Health Alerts:</strong> Automated notifications for hazardous air quality events.
                        </li>
                        <li>
                            <strong>Geo-specific Insights:</strong> Neighborhood-level breakdowns and personalized recommendations.
                        </li>
                        <li>
                            <strong>Data Export:</strong> Downloadable reports for research and policy analysis.
                        </li>
                        <li>
                            <strong>Mobile Friendly:</strong> Responsive design for seamless access on any device.
                        </li>
                    </motion.ul>
                </div>
            </motion.div>
        </div>
    );
};

export default Creators;
