import Navbar from "@/features/AQI-display/presentation/components/Navbar";
import Sidebar from "@/features/AQI-display/presentation/components/Sidebar";
import { lazy } from "react";

const SmogPredictionAnalytics = lazy(() => import("./SmogPredictionAnalytics"));
const Analytics = () => {
    return (
        <div className='flex flex-col h-screen overflow-y-scroll'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <SmogPredictionAnalytics />
            </div>
        </div>
    )
}

export default Analytics;