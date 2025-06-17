"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { user } from "../../utils/profile-user";

const Profile = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-5 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Cover Photo */}
                <div className="relative z-10 h-56 w-full">
                    <Image
                        src={user.coverPhoto}
                        alt="Cover Photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>

                {/* Profile Info */}
                <div className="p-6 flex flex-col items-center md:flex-row md:items-start">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="w-28 h-28 rounded-full overflow-hidden z-20 border-4 border-white -mt-14 shadow-md"
                    >
                        <Image
                            src={user.profilePic}
                            alt="Profile Picture"
                            width={112}
                            height={112}
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-center md:text-left md:ml-6 mt-4 md:mt-0"
                    >
                        <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <a className="mt-2 text-blue-600" target="_blank" href="https://enorus.com/">Enorus Ltd (UK)</a>
                        <p className="text-gray-500">{user.location}</p>
                        <p className="mt-2 text-gray-600">{user.bio}</p>
                        

                        {/* Action Buttons */}
                        <div className="flex justify-center md:justify-start gap-4 mt-4">
                            {/* Download CV */}
                            <motion.a
                                href={user.cvLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="text-blue-600 hover:text-blue-800 px-1 transition-colors text-2xl"
                                title="Download CV"
                            >
                                <FaDownload />
                            </motion.a>

                            {/* GitHub */}
                            <motion.a
                                href={user.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="text-gray-700 hover:text-black px-1 ransition-colors text-2xl"
                                title="GitHub Profile"
                            >
                                <FaGithub />
                            </motion.a>

                            {/* LinkedIn */}
                            <motion.a
                                href={user.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="text-blue-700 hover:text-blue-900 px-1 transition-colors text-2xl"
                                title="LinkedIn Profile"
                            >
                                <FaLinkedin />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
