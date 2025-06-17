'use client'
import React, { lazy } from 'react'


const SmogHistory = lazy(() => import('@/features/history/presentation/pages/SmogHistory'))


const page = () => {
    return (
        <SmogHistory />
    )
}

export default page;