'use client'
import { lazy } from "react"

const Creators = lazy(() => import('@/features/specials/presentation/pages/Creators'))

const page = () => {
    return (
        <Creators />
    )
}

export default page