"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaCalendarAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";

const HistoryComponent = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("Last 7 Days");


    const timeRanges = [
        { name: "Last 7 Days", value: "7d" },
        { name: "Last 30 Days", value: "30d" },
        { name: "Last 6 Months", value: "6m" },
        { name: "Last Year", value: "1y" },
    ];


    const historicalData = [
        { date: "2023-10-01", value: 120, trend: "up" },
        { date: "2023-10-02", value: 110, trend: "down" },
        { date: "2023-10-03", value: 130, trend: "up" },
        { date: "2023-10-04", value: 100, trend: "down" },
        { date: "2023-10-05", value: 140, trend: "up" },
        { date: "2023-10-06", value: 90, trend: "down" },
        { date: "2023-10-07", value: 150, trend: "up" },
    ];


    const currentTimeRange = timeRanges.find((range) => range.name === selectedTimeRange);

    return (
        <motion.div
            className="p-8 flex-1 text-white bg-gray-900 h-screen shadow-2xl overflow-y-auto overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

            <motion.h2
                className="text-3xl font-bold mb-6 text-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
                Historical Smog Data
            </motion.h2>


            <motion.div
                className="flex justify-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {timeRanges.map((range) => (
                    <button
                        key={range.name}
                        onClick={() => setSelectedTimeRange(range.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTimeRange === range.name
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-800 hover:bg-gray-700"
                            }`}
                    >
                        <FaCalendarAlt className="w-5 h-5" />
                        <span>{range.name}</span>
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
                    <FaChartLine className="text-blue-500" /> Historical Trends for {selectedTimeRange}
                </h3>
                <div className="space-y-4">
                    {historicalData.map((data, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">{data.date}</span>
                                <span className="text-white font-semibold">{data.value} AQI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {data.trend === "up" ? (
                                    <FaArrowUp className="text-red-500" />
                                ) : (
                                    <FaArrowDown className="text-green-500" />
                                )}
                                <span className={`text-sm ${data.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                                    {data.trend === "up" ? "Increase" : "Decrease"}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>


            <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
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