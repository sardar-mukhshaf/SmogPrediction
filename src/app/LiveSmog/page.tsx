'use client'
import { lazy } from "react"

const LiveSmogValues = lazy(() => import('@/features/live-smog/presentation/pages/LiveSmogValue'))

const page = () => {
    return (
        <LiveSmogValues />
    )
}

export default page