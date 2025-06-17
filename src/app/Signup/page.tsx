'use client'
import React, { lazy } from 'react'

const Signup = lazy(() => import('@/features/authentication/presentation/pages/Signup'))

const Page = () => {
    return <Signup />
}
export default Page