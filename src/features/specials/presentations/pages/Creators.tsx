"use client";
import React, { useEffect, useRef, useState } from "react";
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
        name: 'Sardar Mukhshaf',
        profilePicture: 'https://discover.therookies.co/content/images/2024/08/still01.jpg',
        description: "With expertise in the MERN stack, I specialize in building dynamic full-stack web applications using MongoDB, Express.js, React.js, and Node.js, ensuring seamless user experiences. I also have advanced skills in creating intricate animations with GSAP, utilizing its powerful features for high-performance, smooth transitions. Additionally, I'm proficient in Framer Motion for animating React components, enhancing UI/UX with fluid transitions and interactive effects. My knowledge of LocomotiveJS enables me to create engaging, scroll-driven animations, adding dynamic interactivity to web pages. As a graphic designer, I bring a strong design sense, creating visually compelling layouts and user interfaces using tools like Adobe Illustrator, Photoshop. These combined skills allow me to craft visually rich, interactive, and responsive web applications.",
        email: 'mukhashaf.khurshid@mightyfurniture.co.uk',
    },
    {
        id: 2,
        name: 'Batool Shahid',
        profilePicture: 'https://via.placeholder.com/150',
        description: "As a final-year student...",
        email: 'batoolshahid@example.com',
    },
    {
        id: 3,
        name: 'Athar Ali',
        profilePicture: 'https://via.placeholder.com/150',
        description: "As a final-year student...",
        email: 'atharali@example.com',
    },
];

const Creators: React.FC = () => {
    const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const floatingOrbsRef = useRef<HTMLDivElement[]>([]);

    const toggleDropdown = (id: number) => {
        setSelectedAdmin(selectedAdmin === id ? null : id);
    };

    useEffect(() => {
        gsap.to(bgRef.current, {
            background: "linear-gradient(135deg, #4A00E0, #8E2DE2, #00C9FF, #92FE9D)",
            backgroundSize: "400% 400%",
            duration: 10,
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
            boxShadow: "0px 0px 50px rgba(255, 255, 255, 0.3)",
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
            className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden"
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { floatingOrbsRef.current[i] = el as HTMLDivElement; }}
                    className="absolute w-20 h-20 bg-purple-400 rounded-full opacity-30"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        filter: "blur(30px)",
                    }}
                />
            ))}

            <div className="flex space-x-4 mb-8 z-10">
                {admins.map((admin) => (
                    <motion.button
                        key={admin.id}
                        onClick={() => toggleDropdown(admin.id)}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/10 backdrop-blur-md text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-white/20 transition-all border border-white/10"
                    >
                        {admin.name}
                    </motion.button>
                ))}
            </div>

            <div className="w-full max-w-2xl space-y-4 z-10">
                <AnimatePresence>
                    {admins.map((admin) => (
                        selectedAdmin === admin.id && (
                            <motion.div
                                key={admin.id}
                                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10"
                            >
                                <div className="relative h-64">
                                    <img
                                        src={admin.profilePicture}
                                        alt={admin.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <h1 className="text-4xl font-bold text-white">{admin.name}</h1>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <p className="text-gray-200 text-lg mb-6">{admin.description}</p>
                                    <div className="flex items-center space-x-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-gray-300"
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
                                            className="text-xl text-gray-300 hover:text-purple-400 transition-all"
                                        >
                                            {admin.email}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Creators;
