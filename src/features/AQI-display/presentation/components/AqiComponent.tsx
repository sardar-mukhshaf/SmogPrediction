"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaSmog, FaWind, FaSun, FaLeaf, FaMarsStrokeH, FaClock, FaArrowsAltH } from "react-icons/fa";
import { sensorInput } from '@/features/predictions/utils/sensor-data';

const AQIComponent: React.FC = () => {
    const [aqi, setAqi] = useState<number>(99);

    useEffect(() => {
    const fetchAqiPrediction = async () => {
        try {
            console.log("Sending data to API:", sensorInput); // Log data being sent
            
            // const response = await axios.post(
            //     "https://aqi-api-clean.onrender.com/predict",
            //     sensorInput,
            //     {
            //         headers: { "Content-Type": "application/json" },
            //         timeout: 10000,
            //     }
            // );
            // setAqi(response.data.predicted_aqi);
        } catch (error) {
            console.error("Error fetching AQI prediction:", error);
        }
    };

    // Call once immediately then set interval
    fetchAqiPrediction();
    const intervalId = setInterval(fetchAqiPrediction, 20000);
    return () => clearInterval(intervalId);
}, []);

    const pollutants = [
        { name: "PM2.5", value: 185.5, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
        { name: "PM10", value: 432.0, unit: "µg/m³", icon: <FaSmog className="w-6 h-6" /> },
        { name: "O₃", value: 0.25, unit: "ppm", icon: <FaSun className="w-6 h-6" /> },
        { name: "NO₂", value: 0.71, unit: "ppm", icon: <FaWind className="w-6 h-6" /> },
        { name: "SO₂", value: 0.35, unit: "ppm", icon: <FaLeaf className="w-6 h-6" /> },
        { name: "CO", value: 15.8, unit: "ppm", icon: <FaMarsStrokeH className="w-6 h-6" /> },
        { name: "NO", value: 0.45, unit: "ppm", icon: <FaClock className="w-6 h-6" /> },
        { name: "Wind Speed", value: 1.2, unit: "m/s", icon: <FaArrowsAltH className="w-6 h-6" /> },
        { name: "Wind Direction", value: 90.0, unit: "°", icon: <FaWind className="w-6 h-6" /> },
        { name: "CO 8hr", value: 12.3, unit: "ppm", icon: <FaClock className="w-6 h-6" /> },
        { name: "PM2.5 Avg", value: 165.0, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
        { name: "PM10 Avg", value: 410.0, unit: "µg/m³", icon: <FaSmog className="w-6 h-6" /> },
        { name: "SO₂ Avg", value: 0.31, unit: "ppm", icon: <FaLeaf className="w-6 h-6" /> },
        { name: "O₃ 8hr", value: 0.21, unit: "ppm", icon: <FaSun className="w-6 h-6" /> },
        { name: "NOx", value: 0.95, unit: "ppm", icon: <FaWind className="w-6 h-6" /> },
        { name: "NOx Avg", value: 0.95, unit: "ppm", icon: <FaWind className="w-6 h-6" /> },
        { name: "NOx 8hr", value: 0.95, unit: "ppm", icon: <FaWind className="w-6 h-6" /> },
        { name: "O₃ Avg", value: 0.25, unit: "ppm", icon: <FaSun className="w-6 h-6" /> },
        { name: "O₃ 8hr Avg", value: 0.21, unit: "ppm", icon: <FaSun className="w-6 h-6" /> },
    ];

    const getAQILevel = (aqi: number) => {
        if (aqi <= 50) return { level: "Good", color: "from-green-300 to-green-500" };
        if (aqi <= 100) return { level: "Moderate", color: "from-yellow-300 to-yellow-500" };
        if (aqi <= 150) return { level: "Sensitive", color: "from-orange-300 to-orange-500" };
        if (aqi <= 200) return { level: "Unhealthy", color: "from-red-300 to-red-500" };
        if (aqi <= 300) return { level: "Very Unhealthy", color: "from-purple-300 to-purple-500" };
        return { level: "Hazardous", color: "from-pink-300 to-pink-500" };
    };

    const currentLevel = getAQILevel(aqi);
    const progress = (aqi / 500) * 100;

    return (
        <motion.div
            className="p-8 flex-1 bg-gradient-to-br from-white to-blue-100 rounded-xl h-screen shadow-xl w-full overflow-x-hidden scrollbar-hide"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <motion.h2
                className="text-[4vh] font-bold mt-6 text-center text-gray-700"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
                Air Quality Index (AQI)
            </motion.h2>

            <motion.div className="relative w-40 h-48 mx-auto mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-300 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent" />
                    <motion.circle
                        className="text-green-500 stroke-current"
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
                        transition={{ duration: 1.5 }}
                    />
                </svg>
            </motion.div>

            <div className="text-center mb-6">
                <p className="text-xl font-semibold text-gray-700">Level: <span className="font-bold text-blue-500">{currentLevel.level}</span></p>
                <p className="text-sm text-gray-500">AQI: {aqi}</p>
            </div>

            <div className="space-y-4 flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4 text-gray-700">Pollutants</h3>
                {pollutants.map((pollutant, index) => (
                    <motion.div
                        key={index}
                        className="flex justify-between items-center w-[70vw] bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl shadow-md hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="text-blue-500">{pollutant.icon}</div>
                            <span className="text-gray-700 font-medium">{pollutant.name}</span>
                        </div>
                        <span className="text-gray-600 font-semibold">{pollutant.value} {pollutant.unit}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AQIComponent;
