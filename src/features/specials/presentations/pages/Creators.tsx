"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


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
        description: "As a final-year student, my academic pursuits have equipped me with a strong foundation in data science and digital marketing. Throughout my studies, I have developed skills in data cleaning, data handling, data visualization, machine learning, and prediction algorithm development. Additionally, I have gained knowledge of SEO optimization techniques, including keyword research, on-page optimization, and link building. For my final-year project, I aim to leverage these skills to explore innovative solutions and demonstrate my understanding of these concepts.",
        email: 'batoolshahid@example.com',
    },
    {
        id: 3,
        name: 'Athar Ali',
        profilePicture: 'https://via.placeholder.com/150',
        description: "As a final-year student, I have developed strong skills in frontend development, WordPress, and programming. My expertise includes HTML, CSS, JavaScript, React, and Tailwind CSS, along with WordPress customization, theme development, and plugin integration. Additionally, I have experience in C++, C#, and Python, which help me approach problem-solving with a broader perspective. I am passionate about creating responsive, user-friendly, and high-performing web solutions. For my final-year project, I aim to apply these skills to develop an innovative and efficient digital solution.",
        email: 'atharali@example.com',
    },
];


const Star = ({ delay, duration }: { delay: number; duration: number }) => {
    return (
        <motion.div
            className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-star"
            initial={{ y: 0 }}
            animate={{ y: '100vh' }}
            transition={{
                delay,
                duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
            }}
        />
    );
};

const Creators: React.FC = () => {
    const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);


    const toggleDropdown = (id: number) => {
        setSelectedAdmin(selectedAdmin === id ? null : id);
    };


    const stars = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#13131a] to-[#000000] flex flex-col items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute inset-0 z-0">
                {stars.map((star) => (
                    <Star key={star.id} delay={star.delay} duration={star.duration} />
                ))}
            </div>


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