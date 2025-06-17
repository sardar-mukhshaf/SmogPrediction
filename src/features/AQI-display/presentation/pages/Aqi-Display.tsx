import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AQIComponent from '../components/AqiComponent';


const AqiDisplay = () => {
    return (
        <div className='flex flex-col h-screen overflow-x-hidden scrollbar-hide'>
            <Navbar />
            <div className='flex scrollbar-hide'>
                <Sidebar />
                <AQIComponent />
            </div>
        </div>
    )
}

export default AqiDisplay;