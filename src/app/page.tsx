'use client'
import React, { lazy, Suspense } from "react";
import "./globals.css";


const Predictions = lazy(() => import("@/features/predictions/presentation/Predictions"));

export default function Home() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
      <Predictions />
    </Suspense>
  );
}