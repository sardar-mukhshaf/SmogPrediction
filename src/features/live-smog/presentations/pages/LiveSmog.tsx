"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCloud, FaSmog, FaWind, FaSun, FaLeaf } from "react-icons/fa";

const LiveSmogScene = () => {
    const [selectedLocation, setSelectedLocation] = useState("Downtown");


    const locations = [
        { name: "Downtown", value: 120, unit: "AQI", icon: <FaMapMarkerAlt className="w-6 h-6" /> },
        { name: "Suburbs", value: 80, unit: "AQI", icon: <FaMapMarkerAlt className="w-6 h-6" /> },
        { name: "Industrial Area", value: 150, unit: "AQI", icon: <FaMapMarkerAlt className="w-6 h-6" /> },
        { name: "Residential Area", value: 90, unit: "AQI", icon: <FaMapMarkerAlt className="w-6 h-6" /> },
    ];


    const pollutants = [
        { name: "PM2.5", value: 35, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
        { name: "PM10", value: 50, unit: "µg/m³", icon: <FaSmog className="w-6 h-6" /> },
        { name: "O₃", value: 120, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
        { name: "NO₂", value: 25, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
        { name: "SO₂", value: 10, unit: "ppb", icon: <FaLeaf className="w-6 h-6" /> },
    ];


    const currentLocation = locations.find((loc) => loc.name === selectedLocation);

    return (
        <motion.div
            className="p-8 flex-1 text-white bg-gray-900 h-screen shadow-2xl overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

            <motion.h2
                className="text-3xl font-bold mb-6 text-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
                Live Smog Scene
            </motion.h2>


            <motion.div
                className="flex justify-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {locations.map((location) => (
                    <button
                        key={location.name}
                        onClick={() => setSelectedLocation(location.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedLocation === location.name
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-800 hover:bg-gray-700"
                            }`}
                    >
                        {location.icon}
                        <span>{location.name}</span>
                    </button>
                ))}
            </motion.div>


            <motion.div
                className="bg-gray-800 p-6 rounded-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" /> Current Smog Levels in {selectedLocation}
                </h3>
                <p className="text-2xl font-semibold">
                    {currentLocation?.value} {currentLocation?.unit}
                </p>
                <p className="text-sm text-gray-400">Last updated: 2 minutes ago</p>
            </motion.div>


            <motion.div
                className="bg-gray-800 p-6 rounded-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaSmog className="text-red-500" /> Pollutant Levels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pollutants.map((pollutant, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-blue-500">{pollutant.icon}</div>
                                <span className="text-white">{pollutant.name}</span>
                            </div>
                            <span className="text-white font-semibold">
                                {pollutant.value} {pollutant.unit}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>


            <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" /> Live Smog Map
                </h3>
                <div className="relative h-64 bg-gray-700 rounded-lg overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-500 to-red-500 opacity-50"
                        animate={{ x: [-100, 100, -100] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-lg font-semibold">Visualizing Smog Levels...</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LiveSmogScene;