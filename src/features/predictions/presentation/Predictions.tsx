import Navbar from "@/features/AQI-display/presentation/components/Navbar";
import Sidebar from "@/features/AQI-display/presentation/components/Sidebar";
import { lazy } from "react";


const FuturePredictions = lazy(() => import("@/features/predictions/presentation/FuturePredictions"));
const Predictions = () => {
    return (
        <div className='flex flex-col h-screen overflow-x-hidden scrollbar-hide'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <FuturePredictions />
            </div>
        </div>
    )
}

export default Predictions;