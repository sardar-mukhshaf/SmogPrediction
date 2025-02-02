"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaSmog, FaWind, FaSun, FaLeaf, FaChartLine, FaThermometerHalf } from "react-icons/fa";

const SmogPredictionAnalytics = () => {
  const [selectedPollutant, setSelectedPollutant] = useState("PM2.5");

 
  const pollutants = [
    { name: "PM2.5", value: 35, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
    { name: "PM10", value: 50, unit: "µg/m³", icon: <FaSmog className="w-6 h-6" /> },
    { name: "O₃", value: 120, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
    { name: "NO₂", value: 25, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
    { name: "SO₂", value: 10, unit: "ppb", icon: <FaLeaf className="w-6 h-6" /> },
  ];


  const predictions = [
    { day: "Monday", value: 120 },
    { day: "Tuesday", value: 90 },
    { day: "Wednesday", value: 110 },
    { day: "Thursday", value: 130 },
    { day: "Friday", value: 100 },
    { day: "Saturday", value: 80 },
    { day: "Sunday", value: 95 },
  ];

 
  const currentPollutant = pollutants.find((p) => p.name === selectedPollutant);

  return (
    <motion.div
      className="p-8 flex-1 text-white bg-gray-900 h-screen shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        Smog Prediction Analytics
      </motion.h2>

     
      <motion.div
        className="flex justify-center gap-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {pollutants.map((pollutant) => (
          <button
            key={pollutant.name}
            onClick={() => setSelectedPollutant(pollutant.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedPollutant === pollutant.name
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            {pollutant.icon}
            <span>{pollutant.name}</span>
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
          <FaThermometerHalf className="text-blue-500" /> Current {selectedPollutant} Levels
        </h3>
        <p className="text-2xl font-semibold">
          {currentPollutant?.value} {currentPollutant?.unit}
        </p>
        <p className="text-sm text-gray-400">Last updated: 5 minutes ago</p>
      </motion.div>

      
      <motion.div
        className="bg-gray-800 p-6 rounded-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaChartLine className="text-green-500" /> 7-Day Smog Prediction
        </h3>
        <div className="flex gap-4 overflow-x-auto">
          {predictions.map((prediction, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-gray-700 p-4 rounded-lg min-w-[100px]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-gray-400">{prediction.day}</p>
              <p className="text-xl font-semibold">{prediction.value}</p>
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
          <FaLeaf className="text-yellow-500" /> Insights
        </h3>
        <ul className="space-y-2">
          <li className="text-gray-400">• High levels of {selectedPollutant} detected in urban areas.</li>
          <li className="text-gray-400">• Expected to decrease by 10% over the next 3 days.</li>
          <li className="text-gray-400">• Sensitive groups should avoid outdoor activities.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default SmogPredictionAnalytics;