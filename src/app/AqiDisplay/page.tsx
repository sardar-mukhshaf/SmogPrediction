'use client'
import { lazy } from 'react'

const AqiDisplay = lazy(() => import('@/features/AQI-display/presentation/pages/Aqi-Display'))

const page = () => {
    return (
        <AqiDisplay />
    )
}

export default page