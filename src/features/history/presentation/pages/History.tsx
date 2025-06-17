"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { historicalData, timeRanges } from "../../utils/history";

// AQI Levels & Color Codes (from FuturePredictions)
const aqiLevels = [
  { level: "Good", range: "0-50", color: "green" },
  { level: "Moderate", range: "51-100", color: "yellow" },
  { level: "Unhealthy for Sensitive Groups", range: "101-150", color: "orange" },
  { level: "Unhealthy", range: "151-200", color: "red" },
  { level: "Very Unhealthy", range: "201-300", color: "purple" },
  { level: "Hazardous", range: "301+", color: "pink" },
];

const getAQILevel = (value: number) => {
  if (value <= 50) return aqiLevels[0];
  if (value <= 100) return aqiLevels[1];
  if (value <= 150) return aqiLevels[2];
  if (value <= 200) return aqiLevels[3];
  if (value <= 300) return aqiLevels[4];
  return aqiLevels[5];
};

const HistoryComponent = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 7 Days");
  const currentTimeRange = timeRanges.find((range) => range.name === selectedTimeRange);
  // Get the latest AQI value from historicalData or set a default value
  const currentAqi = Math.random() * 300; // Simulating current AQI value for demonstration
  const level = getAQILevel(currentAqi);

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-green-100 text-gray-800 w-full flex flex-col gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <motion.h2
        className="text-3xl font-extrabold tracking-tight text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Historical Smog Data
      </motion.h2>

      {/* Current AQI */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2">
          <h3 className="text-md font-semibold text-gray-600">Current AQI</h3>
          <p className={`text-3xl font-bold text-${level.color}-500`}>{currentAqi}</p>
          <p className="text-sm text-gray-400">{level.level}</p>
        </div>
      </motion.div>

      {/* Time Range Buttons */}
      <motion.div
        className="flex justify-center gap-4 mx2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {timeRanges.map((range) => (
          <motion.button
            key={range.name}
            onClick={() => setSelectedTimeRange(range.name)}
            className={`flex items-center gap-1 px-2 py-2 rounded-lg bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition-all ${
              selectedTimeRange === range.name ? "bg-gray-200" : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <FaCalendarAlt className="w-5 h-5 text-gray-600" />
            <span>{range.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Line Chart */}
      <motion.div
        className="bg-white mx-12rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
          <FaChartLine className="text-green-500" /> Historical Trends for {selectedTimeRange}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", color: "#333" }} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: "#3b82f6" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights */}
      <motion.div
        className="bg-white mx-1 px-2 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaChartLine className="text-yellow-500" /> Insights
        </h3>
        <ul className="space-y-2">
          <li className="text-gray-400">• Smog levels have increased by 15% over the past month.</li>
          <li className="text-gray-400">• The highest AQI recorded was 150 on 2023-10-07.</li>
          <li className="text-gray-400">• Sensitive groups should avoid outdoor activities during peak smog hours.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default HistoryComponent;