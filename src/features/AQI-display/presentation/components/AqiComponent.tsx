"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaSmog, FaWind, FaSun, FaLeaf } from "react-icons/fa";

const AQIComponent: React.FC = () => {
    const [aqi, setAqi] = useState<number>(120);

    const pollutants = [
        { name: "PM2.5", value: 35, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
        { name: "PM10", value: 50, unit: "µg/m³", icon: <FaSmog className="w-6 h-6" /> },
        { name: "O₃", value: 120, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
        { name: "NO₂", value: 25, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
        { name: "SO₂", value: 10, unit: "ppb", icon: <FaLeaf className="w-6 h-6" /> },
    ];

    const aqiLevels = [
        { level: "Good", range: "0-50", color: "from-green-400 to-green-600", recommendation: "Enjoy outdoor activities!" },
        { level: "Moderate", range: "51-100", color: "from-yellow-400 to-yellow-600", recommendation: "Sensitive individuals should limit prolonged outdoor exertion." },
        { level: "Unhealthy for Sensitive Groups", range: "101-150", color: "from-orange-400 to-orange-600", recommendation: "Children and elderly should avoid outdoor activities." },
        { level: "Unhealthy", range: "151-200", color: "from-red-400 to-red-600", recommendation: "Everyone should avoid outdoor activities." },
        { level: "Very Unhealthy", range: "201-300", color: "from-purple-400 to-purple-600", recommendation: "Health warnings of emergency conditions." },
        { level: "Hazardous", range: "301+", color: "from-maroon-400 to-maroon-600", recommendation: "Health alert: everyone may experience serious effects." },
    ];

    const getAQILevel = (aqi: number) => {
        if (aqi <= 50) return aqiLevels[0];
        if (aqi <= 100) return aqiLevels[1];
        if (aqi <= 150) return aqiLevels[2];
        if (aqi <= 200) return aqiLevels[3];
        if (aqi <= 300) return aqiLevels[4];
        return aqiLevels[5];
    };

    const currentLevel = getAQILevel(aqi);
    const progress = (aqi / 500) * 100;

    return (
        <motion.div
            className="system p-8 flex-1 text-white bg-gray-900 rounded-xl h-[92vh] shadow-2xl w-[81vw] overflow-x-hidden overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <motion.h2
                className="text-3xl font-bold mb-6 text-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
                Air Quality Index (AQI)
            </motion.h2>

            <motion.div className="relative w-48 h-48 mx-auto mb-6" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-700 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                    <motion.circle
                        className={`text-${currentLevel.color.split("-")[1]}-500 stroke-current`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * progress) / 100}
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    ></motion.circle>
                </svg>
            </motion.div>

            <motion.div className="text-center mb-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <p className="text-xl font-semibold">Level: <span className={`text-${currentLevel.color.split("-")[1]}-500`}>{currentLevel.level}</span></p>
                <p className="text-sm text-gray-400">Range: {currentLevel.range}</p>
            </motion.div>

            <motion.div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 ml-20">Pollutants</h3>
                {pollutants.map((pollutant, index) => (
                    <motion.div
                        key={index}
                        className="flex justify-between items-center z-[100] bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300"
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`text-${currentLevel.color.split("-")[1]}-500`}>{pollutant.icon}</div>
                            <span className="text-white">{pollutant.name}</span>
                        </div>
                        <span className="text-white font-semibold">{pollutant.value} {pollutant.unit}</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default AQIComponent;
