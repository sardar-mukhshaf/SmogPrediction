"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

import { sensorInput } from "../utils/sensor-data";
import { ChartDataPoint, ForecastCardProps, ForecastType, getAQILevel, LOCATIONS, SensorData } from "../utils/predictionInterfaces";
import { GiBiohazard, GiSkullCrossedBones } from "react-icons/gi";
import { MdError, MdWarning } from "react-icons/md";



const FuturePredictions: React.FC = () => {
  const [aqi, setAqi] = useState<number>(0);
  const [forecast, setForecast] = useState<ForecastType>({ day: 0, week: 0, month: 0 });
  const [location, setLocation] = useState<string>(LOCATIONS[0]);
  const [pageKey, setPageKey] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchAqiPrediction = async (): Promise<void> => {
    try {
      const data: SensorData = sensorInput[Math.floor(Math.random() * sensorInput.length)];

      const response = await axios.post<{ predicted_aqi: number }>(
        process.env.NEXT_PUBLIC_AQI_API_URL || "https://aqi-api-clean.onrender.com/predict",
        data,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );

      const predictedAQI = parseFloat((response.data.predicted_aqi || 120).toFixed(2));
      setAqi(predictedAQI);

      setForecast({
        day: parseFloat((predictedAQI + 5 + (Math.random() * 6 - 4)).toFixed(2)),
        week: parseFloat((predictedAQI + 15 + (Math.random() * 16 - 7)).toFixed(2)),
        month: parseFloat((predictedAQI + 30 + (Math.random() * 30 - 13)).toFixed(2)),
      });

      setError(null);
      checkAndNotifyAQI(predictedAQI);
    } catch (error) {
      toast.error("Failed to fetch AQI prediction. Please try again later.");
    }
  };


  const checkAndNotifyAQI = (aqi: number): void => {
    toast.dismiss();

    if (aqi > 101) {
      let message = "";
      let colorClass = "";
      let IconComponent = MdWarning; // Default icon

      if (aqi <= 150) {
        message = "Unhealthy for Sensitive Groups: Limit prolonged outdoor activity.";
        colorClass = "text-yellow-500";
        IconComponent = MdWarning;
      } else if (aqi <= 200) {
        message = "Unhealthy: Sensitive groups should avoid outdoor activity.";
        colorClass = "text-red-500";
        IconComponent = MdError;
      } else if (aqi <= 300) {
        message = "Very Unhealthy: Avoid outdoor activities.";
        colorClass = "text-purple-500";
        IconComponent = GiBiohazard;
      } else {
        message = "Hazardous: Avoid all outdoor activities.";
        colorClass = "text-pink-500";
        IconComponent = GiSkullCrossedBones;
      }

      toast.custom(
        (t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto z-[1000] flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4 flex items-center space-x-3">
              <IconComponent className={`w-10 h-10 ${colorClass}`} />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  AQI Alert: {aqi.toFixed(2)}
                </p>
                <p className={`mt-1 text-sm ${colorClass}`}>{message}</p>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
              >
                Dismiss
              </button>
            </div>
          </div>
        ),
        { duration: 15000 }
      );
    }
  };

  useEffect(() => {
    fetchAqiPrediction();

    const intervalId = setInterval(() => {
      fetchAqiPrediction();
      setPageKey((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [location]);

  const level = getAQILevel(aqi);
  const progress = (aqi / 500) * 100;

  const chartData: ChartDataPoint[] = [
    { name: "Now", aqi },
    { name: "Tomorrow", aqi: forecast.day },
    { name: "Next Week", aqi: forecast.week },
    { name: "Next Month", aqi: forecast.month },
  ];

  return (
    <motion.div
      key={pageKey}
      className="min-h-screen p-10 bg-gradient-to-br from-blue-100 to-green-100 text-gray-800 w-full flex flex-col gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Conditional Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-8" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-none mt-6 ml-24">Smog Prediction</h1>
        <select
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setPageKey((prev) => prev + 1);
          }}
        >
          {LOCATIONS.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* AQI Gauge */}
      <div className="flex justify-center">
        <motion.div
          className="relative w-44 h-44 rounded-full bg-white shadow-xl flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="absolute w-full h-full">
            <circle cx="50%" cy="50%" r="70" stroke="lightgray" strokeWidth="10" fill="none" />
            <circle
              cx="50%"
              cy="50%"
              r="70"
              stroke={level.color}
              strokeWidth="10"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-700">{aqi.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{level.level}</p>
          </div>
        </motion.div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        <ForecastCard title="Tomorrow" value={forecast.day} />
        <ForecastCard title="Next Week" value={forecast.week} />
        <ForecastCard title="Next Month" value={forecast.month} />
      </div>

      {/* Line Chart */}
      <div className="bg-white mx-8 p-4 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">AQI Forecast Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Line type="monotone" dataKey="aqi" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const ForecastCard: React.FC<ForecastCardProps> = ({ title, value }) => {
  const level = getAQILevel(value);
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-md font-semibold text-gray-600">{title}</h3>
      <p className={`text-3xl font-bold text-${level.color}-500`}>{value.toFixed(2)}</p>
      <p className="text-sm text-gray-400">{level.level}</p>
    </motion.div>
  );
};

export default FuturePredictions;
