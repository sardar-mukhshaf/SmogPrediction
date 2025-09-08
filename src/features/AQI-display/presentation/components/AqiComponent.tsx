"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sensorInput } from '@/features/predictions/utils/sensor-data';
import { getAQILevel, pollutants } from "./reuseable-aqi-components";

const AQIComponent: React.FC = () => {
    const [aqi, setAqi] = useState<number>(99);

    useEffect(() => {
    const fetchAqiPrediction = async () => {
        try {
            // console.log("Sending data to API:", sensorInput); // Log data being sent
            
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
