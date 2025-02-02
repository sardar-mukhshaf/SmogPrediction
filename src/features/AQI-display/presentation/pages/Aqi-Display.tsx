import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AQIComponent from '../components/AqiComponent';


const AqiDisplay = () => {
    return (
        <div className='flex flex-col h-screen bg-gray-900 overflow-hidden'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <AQIComponent />
            </div>
        </div>
    )
}

export default AqiDisplay;