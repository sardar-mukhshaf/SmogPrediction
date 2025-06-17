import { FaCloud, FaSmog, FaWind, FaSun, FaLeaf } from "react-icons/fa";
import React from "react";

export const pollutants = [
  { name: "PM2.5", value: 35, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
  { name: "PM10", value: 50, unit: "µg/m³", icon: <FaSmog className="w-6 h-6" /> },
  { name: "O₃", value: 120, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
  { name: "NO₂", value: 25, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
  { name: "SO₂", value: 10, unit: "ppb", icon: <FaLeaf className="w-6 h-6" /> },
];

export const predictions = [
  { day: "Monday", value: 120 },
  { day: "Tuesday", value: 90 },
  { day: "Wednesday", value: 110 },
  { day: "Thursday", value: 130 },
  { day: "Friday", value: 100 },
  { day: "Saturday", value: 80 },
  { day: "Sunday", value: 95 },
];