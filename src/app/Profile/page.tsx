'use client'
import React, { lazy } from 'react'


const Profile = lazy(() => import('@/features/profile/presentation/pages/Profile'))

const page = () => {
    return (
        <Profile />
    )
}

export default page