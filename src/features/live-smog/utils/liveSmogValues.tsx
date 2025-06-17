import {
  FaMapMarkerAlt,
  FaCloud,
  FaSmog,
  FaWind,
  FaSun,
  FaLeaf,
} from "react-icons/fa";

export const locations = [
  {
    name: "Downtown",
    value: 120,
    unit: "AQI",
    icon: <FaMapMarkerAlt className="w-6 h-6" />,
  },
  {
    name: "Suburbs",
    value: 80,
    unit: "AQI",
    icon: <FaMapMarkerAlt className="w-6 h-6" />,
  },
  {
    name: "Industrial Area",
    value: 150,
    unit: "AQI",
    icon: <FaMapMarkerAlt className="w-6 h-6" />,
  },
  {
    name: "Residential Area",
    value: 90,
    unit: "AQI",
    icon: <FaMapMarkerAlt className="w-6 h-6" />,
  },
];

export const pollutants = [
  {
    name: "PM2.5",
    value: 35,
    unit: "µg/m³",
    icon: <FaCloud className="w-6 h-6" />,
  },
  {
    name: "PM10",
    value: 50,
    unit: "µg/m³",
    icon: <FaSmog className="w-6 h-6" />,
  },
  { name: "O₃", value: 120, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
  { name: "NO₂", value: 25, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
  { name: "SO₂", value: 10, unit: "ppb", icon: <FaLeaf className="w-6 h-6" /> },
  { name: "CO", value: 0.5, unit: "ppm", icon: <FaLeaf className="w-6 h-6" /> },
  { name: "NO", value: 15, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
  { name: "Wind Speed", value: 3.5, unit: "m/s", icon: <FaWind className="w-6 h-6" /> },
  { name: "Wind Direction", value: 180, unit: "°", icon: <FaWind className="w-6 h-6" /> },
  { name: "CO 8hr", value: 0.4, unit: "ppm", icon: <FaLeaf className="w-6 h-6" /> },
  { name: "PM2.5 Avg", value: 30, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
  { name: "PM10 Avg", value: 45, unit: "µg/m³", icon: <FaSmog className="w-6 h-6" /> },
  { name: "SO₂ Avg", value: 8, unit: "ppb", icon: <FaLeaf className="w-6 h-6" /> },
  { name: "O₃ 8hr", value: 100, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
  { name: "NOx", value: 40, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
  { name: "NOx Avg", value: 35, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
  { name: "NOx 8hr", value: 30, unit: "ppb", icon: <FaWind className="w-6 h-6" /> },
  { name: "O₃ Avg", value: 110, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
  { name: "O₃ 8hr Avg", value: 95, unit: "ppb", icon: <FaSun className="w-6 h-6" /> },
  { name: "PM2.5 24hr", value: 40, unit: "µg/m³", icon: <FaCloud className="w-6 h-6" /> },
];


export const pollutantTrends = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 135 },
  { day: "Wed", value: 110 },
  { day: "Thu", value: 150 },
  { day: "Fri", value: 140 },
  { day: "Sat", value: 130 },
  { day: "Sun", value: 125 },
];
