"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaSmog, FaWind, FaSun, FaLeaf, FaChartLine, FaThermometerHalf } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { pollutants, predictions } from "../../utils/analytics";

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

const SmogPredictionAnalytics = () => {
  const [selectedPollutant, setSelectedPollutant] = useState("PM2.5");
  const currentPollutant = pollutants.find((p) => p.name === selectedPollutant);
  const level = getAQILevel(currentPollutant?.value || 0);
  
  // Calculate average prediction value
  const averagePrediction = predictions.reduce((sum, p) => sum + p.value, 0) / predictions.length;

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-green-100 text-gray-800 w-full overflow-x-hidden flex flex-col gap-10"
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
        Smog Prediction Analytics
      </motion.h2>

      {/* Pollutant Selection */}
      <motion.div
        className="flex justify-center gap-4 flex-wrap mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {pollutants.map((pollutant) => (
          <motion.button
            key={pollutant.name}
            onClick={() => setSelectedPollutant(pollutant.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition-all ${
              selectedPollutant === pollutant.name ? "bg-gradient-to-r from-green-400 to-blue-500 text-white" : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {pollutant.icon}
            <span>{pollutant.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Current Pollutant Levels */}
      <motion.div
        className="bg-white mx-12 p-12 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-md font-semibold text-gray-600 flex items-center gap-2">
          <FaThermometerHalf className="text-blue-400" /> Current {selectedPollutant} Levels
        </h3>
        <p className={`text-3xl font-bold text-${level.color}`}>
          {currentPollutant?.value} {currentPollutant?.unit}
        </p>
        <p className="text-sm text-gray-400">Last updated: 5 minutes ago</p>
      </motion.div>

      {/* 7-Day Prediction */}
      <motion.div
        className="bg-white mx-12 p-4 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2 text-green-300">
          <FaChartLine className="text-green-400" /> 7-Day Smog Prediction
        </h3>
        <motion.div
          className="bg-white p-4 rounded-xl shadow-lg mb-4 flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center">
            <p className="text-md font-semibold text-gray-600">Average Predicted Value</p>
            <p className={`text-2xl font-bold text-${getAQILevel(averagePrediction).color}`}>
              {averagePrediction.toFixed(1)}
            </p>
          </div>
        </motion.div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictions}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="day" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", color: "#333" }} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: "#3b82f6" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights */}
      <motion.div
        className="bg-white mx-12 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-300">
          <FaLeaf className="text-yellow-400" /> Insights
        </h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>• High levels of {selectedPollutant} detected in urban areas.</li>
          <li>• Expected to decrease by 10% over the next 3 days.</li>
          <li>• Sensitive groups should avoid outdoor activities.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default SmogPredictionAnalytics;