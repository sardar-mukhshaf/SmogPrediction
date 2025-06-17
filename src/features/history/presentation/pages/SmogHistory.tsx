import Navbar from "@/features/AQI-display/presentation/components/Navbar";
import Sidebar from "@/features/AQI-display/presentation/components/Sidebar";
import { lazy } from "react";

const History = lazy(() => import("./History"));
const SmogHistory = () => {
    return (
        <div className='flex flex-col h-screen overflow-x-hidden scrollbar-hide'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <History />
            </div>
        </div>
    )
}

export default SmogHistory;