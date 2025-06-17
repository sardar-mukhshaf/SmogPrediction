"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCloud, FaSmog, FaWind, FaSun, FaLeaf } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { locations, pollutants, pollutantTrends } from "../../utils/liveSmogValues";

// AQI Levels & Color Codes (adapted from FuturePredictions, using LiveSmogScene colors)
const aqiLevels = [
    { level: "Good", range: "0-50", color: "green-400" },
    { level: "Moderate", range: "51-100", color: "yellow-300" },
    { level: "Unhealthy for Sensitive Groups", range: "101-150", color: "orange-400" },
    { level: "Unhealthy", range: "151-200", color: "red-400" },
    { level: "Very Unhealthy", range: "201-300", color: "purple-400" },
    { level: "Hazardous", range: "301+", color: "pink-400" },
];

const getAQILevel = (value: number) => {
    if (value <= 50) return aqiLevels[0];
    if (value <= 100) return aqiLevels[1];
    if (value <= 150) return aqiLevels[2];
    if (value <= 200) return aqiLevels[3];
    if (value <= 300) return aqiLevels[4];
    return aqiLevels[5];
};

const LiveSmogScene = () => {
    const [selectedLocation, setSelectedLocation] = useState("Downtown");
    const currentLocation = locations.find((loc) => loc.name === selectedLocation);
    const level = getAQILevel(currentLocation?.value || 0);

    return (
        <motion.div
            className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-green-100 text-gray-800 w-full flex flex-col gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Header */}
            <motion.h2
                className="text-3xl font-extrabold tracking-tight text-center text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Live Smog Scene
            </motion.h2>

            {/* Location Buttons */}
            <motion.div
                className="flex justify-center gap-4 flex-wrap mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {locations.map((location) => (
                    <motion.button
                        key={location.name}
                        onClick={() => setSelectedLocation(location.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition-all ${selectedLocation === location.name ? "bg-gradient-to-r from-green-400 to-blue-500 text-white" : ""
                            }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        {location.icon}
                        <span>{location.name}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Current Smog Levels */}
            <motion.div
                className="bg-white p-6 mx-12 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
            >
                <h3 className="text-md font-semibold text-gray-600 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-400" /> Current Smog Levels in {selectedLocation}
                </h3>
                <p className={`text-3xl font-bold text-${level.color}`}>{currentLocation?.value} {currentLocation?.unit}</p>
                <p className="text-sm text-gray-400">Last updated: 2 minutes ago</p>
            </motion.div>

            {/* Pollutant Levels */}
            <motion.div
                className="bg-white p-6 mx-12 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-300">
                    <FaSmog className="text-red-400 px-14" /> Pollutant Levels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 gap-4">
                    {pollutants.map((pollutant, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg border border-gray-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-blue-500">{pollutant.icon}</div>
                                <span className="text-gray-600">{pollutant.name}</span>
                            </div>
                            <span className="font-semibold text-gray-800">
                                {pollutant.value} {pollutant.unit}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Smog Trend */}
            <motion.div
                className="bg-white mx-8 p-4 rounded-xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2 text-green-300">
                    <FaLeaf className="text-green-400" /> Smog Trend (Last 7 Days)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={pollutantTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="day" stroke="#555" />
                        <YAxis stroke="#555" />
                        <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", color: "#333" }} />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: "#3b82f6" }} />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Live Smog Map */}
            <motion.div
                className="bg-white mx-8 p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.05 }}
            >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-300">
                    <FaMapMarkerAlt className="text-yellow-400" /> Live Smog Map
                </h3>
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-white rounded-xl shadow-lg">
                        {/* Static map base */}
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                background: `linear-gradient(45deg, #263238 0%, #37474F 20%, #455A64 40%, #546E7A 60%, #607D8B 80%, #78909C 100%),
                radial-gradient(circle at 30% 70%, #455A64 0%, transparent 40%),
                radial-gradient(circle at 70% 30%, #37474F 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, #607D8B 0%, transparent 60%)`,
                                backgroundBlendMode: 'overlay',
                                filter: 'saturate(0.8) brightness(0.9)'
                            }}
                        >
                            {/* Grid lines to simulate map grid */}
                            <div
                                className="w-full h-full opacity-20"
                                style={{
                                    backgroundImage: `linear-gradient(0deg, transparent 94%, rgba(255, 255, 255, 0.6) 2%, transparent 6%),
                    linear-gradient(90deg, transparent 94%, rgba(255, 255, 255, 0.6) 2%, transparent 6%)`,
                                    backgroundSize: '40px 40px'
                                }}
                            />
                        </div>

                        {/* Smog overlay heatmap */}
                        <div className="absolute inset-0 opacity-60">
                            <div
                                className="w-full h-full"
                                style={{
                                    background: `radial-gradient(circle at 40% 40%, rgba(255,0,0,0.8) 0%, rgba(255,165,0,0.6) 30%, rgba(255,255,0,0.5) 50%, rgba(144,238,144,0.3) 70%, transparent 90%),
                    radial-gradient(circle at 60% 60%, rgba(255,0,0,0.7) 0%, rgba(255,165,0,0.5) 40%, transparent 70%),
                    radial-gradient(circle at 80% 20%, rgba(255,165,0,0.6) 0%, rgba(255,255,0,0.4) 30%, transparent 60%)`
                                }}
                            />
                        </div>

                        {/* Map UI elements */}
                        <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md flex flex-col space-y-2 text-xs">
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-gray-800">Severe</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                <span className="text-gray-800">High</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                                <span className="text-gray-800">Moderate</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <span className="text-gray-800">Low</span>
                            </div>
                        </div>

                        {/* Live indicator */}
                        <div className="absolute top-2 left-2 bg-white text-gray-800 px-2 py-1 rounded-md text-xs flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1 animate-pulse"></div>
                            LIVE
                        </div>

                        {/* Bottom timestamp */}
                        <div className="absolute bottom-2 left-2 bg-white text-gray-800 px-2 py-1 rounded-md text-xs">
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LiveSmogScene;