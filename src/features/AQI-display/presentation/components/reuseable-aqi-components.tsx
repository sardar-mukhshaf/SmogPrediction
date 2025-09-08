import { FaCloud, FaSmog, FaWind, FaSun, FaLeaf, FaMarsStrokeH, FaClock, FaArrowsAltH } from "react-icons/fa";


export const pollutants = [
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


export const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: "Good", color: "from-green-300 to-green-500" };
    if (aqi <= 100) return { level: "Moderate", color: "from-yellow-300 to-yellow-500" };
    if (aqi <= 150) return { level: "Sensitive", color: "from-orange-300 to-orange-500" };
    if (aqi <= 200) return { level: "Unhealthy", color: "from-red-300 to-red-500" };
    if (aqi <= 300) return { level: "Very Unhealthy", color: "from-purple-300 to-purple-500" };
    return { level: "Hazardous", color: "from-pink-300 to-pink-500" };
};
