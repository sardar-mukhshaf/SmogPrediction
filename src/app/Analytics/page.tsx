'use client'
import React, { lazy } from 'react'


const Analytics = lazy(() => import('@/features/analytics/presentation/pages/Analytics'))

const page = () => {
    return (
        <Analytics />
    )
}

export default page