"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Admin {
    id: number;
    name: string;
    profilePicture: string;
    description: string;
    email: string;
}

const admins: Admin[] = [
    {
        id: 1,
        name: "Sardar Mukhshaf",
        profilePicture: "https://discover.therookies.co/content/images/2024/08/still01.jpg",
        description: "A MERN stack developer with expertise in animation libraries including Framer Motion, GSAP, and LocomotiveJS, specializing in creating immersive digital experiences. Recent work includes developing SmogSense, an advanced air quality prediction system that combines ML algorithms with an intuitive UI to visualize pollution data through dynamic animations and interactive charts. The project leverages React for responsive frontend components, Node.js for real-time data processing, and incorporates DevOps practices for reliable deployment and performance optimization.",
        email: "mukhashaf.khurshid@mightyfurniture.co.uk",
    },
    {
        id: 2,
        name: "Batool Shahid",
        profilePicture: "https://via.placeholder.com/150",
        description: "Front-end enthusiast focused on intuitive, beautiful, and functional interfaces with React & Tailwind.",
        email: "batoolshahid@example.com",
    },
    {
        id: 3,
        name: "Athar Ali",
        profilePicture: "https://via.placeholder.com/150",
        description: "Backend developer & ML explorer: APIs, server-side logic, and predictive models integration.",
        email: "atharali@example.com",
    },
];

const Creators: React.FC = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const floatingOrbsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        gsap.to(bgRef.current, {
            background: "linear-gradient(135deg, #7F00FF, #E100FF, #00FFFF, #FF00FF)",
            backgroundSize: "400% 400%",
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        floatingOrbsRef.current.forEach((orb, index) => {
            gsap.to(orb, {
                y: () => Math.random() * 50 - 25,
                x: () => Math.random() * 50 - 25,
                duration: 4 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        gsap.to(".glow-effect", {
            boxShadow: "0px 0px 50px rgba(173, 216, 230, 0.7)",
            scrollTrigger: {
                trigger: ".glow-effect",
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
            },
        });
    }, []);

    return (
        <div
            ref={bgRef}
            className="min-h-screen bg-gradient-to-r from-purple-800 via-pink-600 to-blue-500 flex flex-col items-center justify-start p-8 relative overflow-hidden"
        >
            {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                    key={i}
                    ref={(el) => { floatingOrbsRef.current[i] = el as HTMLDivElement; }}
                    className="absolute w-24 h-24 bg-pink-500 rounded-full opacity-10"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        filter: "blur(50px)",
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            ))}

            <motion.h1
                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 mb-16 z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Meet Our Creators
            </motion.h1>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
                <AnimatePresence>
                    {admins.map((admin) => (
                        <motion.div
                            key={admin.id}
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(0,255,255,0.4)",
                            }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-purple-700/60 to-pink-600/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-400/30 h-[50vh] glow-effect flex flex-col overflow-hidden"
                        >
                            <div className="relative h-1/2">
                                <motion.img
                                    src={admin.profilePicture}
                                    alt={admin.name}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <h2 className="text-3xl font-bold text-cyan-300 drop-shadow-lg">{admin.name}</h2>
                                </motion.div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <motion.p
                                    className="text-pink-200 text-sm leading-relaxed overflow-y-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    {admin.description}
                                </motion.p>
                                <motion.div
                                    className="flex items-center space-x-4 mt-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-cyan-300"
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
                                        className="text-cyan-200 hover:text-pink-400 transition duration-300 text-sm"
                                    >
                                        {admin.email}
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div
                className="w-full max-w-5xl mt-20 z-10"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="bg-gradient-to-br from-pink-600/20 to-purple-700/30 backdrop-blur-xl rounded-3xl p-10 border border-pink-500/30 shadow-xl">
                    <motion.h2
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 mb-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Smog Prediction System with ML
                    </motion.h2>
                    <motion.p
                        className="text-pink-200 text-base leading-relaxed"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Technical Foundation
                        The system integrates multiple data sources to build a holistic view of air quality:

                        Multi-parameter pollutant tracking: Monitors PM2.5, PM10, O₃, NO₂, SO₂, CO, NOx and other critical pollutants
                        Real-time sensor network: Processes continuous data streams from distributed sensor arrays
                        Weather variable integration: Incorporates wind speed, direction, and atmospheric conditions
                        Temporal analysis: Evaluates both instantaneous readings and time-averaged values (8-hour, daily)
                        Frontend Innovation
                        The React-based frontend features:

                        Dynamic visualizations: Real-time AQI gauges with color-coded risk indicators
                        Motion-enhanced UI: Leverages Framer Motion for fluid, engaging user interactions
                        Responsive design: Adapts seamlessly across device types
                        Geospatial heatmap: Visualizes pollution hotspots with gradient overlays
                        Interactive charts: Displays temporal trends with Recharts integration
                        Predictive Capabilities
                        The system goes beyond current conditions to deliver actionable forecasts:

                        Multi-horizon predictions: Next-day, week, and month forecasts
                        Uncertainty modeling: Incorporates statistical variance for realistic prediction ranges
                        Pollutant-specific trends: Tracks individual pollutant trajectories
                        Location-based customization: Adapts predictions to specific geographic contexts
                        Public Health Impact
                        SmogSense empowers:

                        Early warning system: Alerts to dangerous air quality conditions before they reach critical levels
                        Health risk assessment: Correlates AQI values with potential health impacts
                        Exposure mitigation: Provides timely information to minimize public exposure during peak pollution events
                        Policy decision support: Offers data-driven insights for environmental regulation and urban planning </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Creators;
