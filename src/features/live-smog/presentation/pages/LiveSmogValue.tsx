import Navbar from "@/features/AQI-display/presentation/components/Navbar";
import Sidebar from "@/features/AQI-display/presentation/components/Sidebar";
import { lazy } from "react";

const LiveSmog = lazy(() => import("./LiveSmog"));
const LiveSmogValues = () => {
    return (
        <div className='flex flex-col h-screen overflow-y-scroll'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <LiveSmog />
            </div>
        </div>
    )
}

export default LiveSmogValues;