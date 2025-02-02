"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const Profile = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const user = {
        name: "Sardar Mukhshaf",
        email: "mukhashaf.khurshid@mightyfurniture.com",
        location: "Mirpur, AJK",
        profilePic: "/placeholder-profile.png", 
        coverPhoto: "/placeholder-cover.jpg", 
        bio: "Full-Stack web developer, working with React, Next.js, and Tailwind CSS.",
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-64 w-full rounded-lg overflow-hidden"
            >
                <Image
                    src={user.coverPhoto}
                    alt="Cover Photo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
                <div className="absolute inset-0 bg-white bg-opacity-50"></div>
            </motion.div>

            
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center md:flex-row md:items-start">
                    
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 -mt-20"
                    >
                        <Image
                            src={user.profilePic}
                            alt="Profile Picture"
                            width={128}
                            height={128}
                            className="object-cover"
                        />
                    </motion.div>

                   
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-center md:text-left md:ml-6 mt-4"
                    >
                        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-500">{user.location}</p>
                        <p className="mt-2 text-gray-600">{user.bio}</p>
                    </motion.div>
                </div>

                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md w-full md:w-auto hover:bg-blue-600 transition-colors"
                >
                    Edit Profile
                </motion.button>
            </div>
        </div>
    );
};

export default Profile;
