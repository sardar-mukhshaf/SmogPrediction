'use client'
import React, { lazy } from 'react'

const Predictions = lazy(() => import('@/features/predictions/presentation/Predictions'))


const Page = () => {
    return <Predictions />
}

export default Page