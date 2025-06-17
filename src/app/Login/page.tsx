'use client'
import React, { lazy } from 'react'

const Login = lazy(() => import('@/features/authentication/presentation/pages/Login'))


const Page = () => {
    return <Login />
}

export default Page