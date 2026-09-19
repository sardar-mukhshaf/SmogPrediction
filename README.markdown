<div align="center">

# 🌫️ SmogPrediction — AI-Powered Air Quality Forecasting

**A full-stack web application that predicts the Air Quality Index (AQI) using Machine Learning, visualizes live smog conditions, and alerts users before the air becomes hazardous.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ML API](https://img.shields.io/badge/ML%20API-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📑 Table of Contents

- [What is SmogPrediction?](#-what-is-smogprediction)
- [Why We Built It](#-why-we-built-it)
- [How It Works](#-how-it-works)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [API Contract](#-api-contract)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Load & Stress Testing (k6)](#-load--stress-testing-k6)
- [AQI Reference](#-aqi-reference)
- [Roadmap](#-roadmap)
- [Screenshots](#-screenshots)
- [Authors](#-authors)

---

## 🧭 What is SmogPrediction?

SmogPrediction is a **full-stack air-quality intelligence platform** for the Azad Kashmir region (Kotli, Mirpur, Bhimbhar, Rawlakot, Bagh, Poonch, Muzaffarabad, Neelum, Haveli). It is the frontend client of an ML-driven smog prediction system:

1. It takes **pollutant sensor readings** — PM2.5, PM10, O₃, NO₂, SO₂, CO, NO, NOx, wind speed & direction — as input.
2. It sends them to a **machine-learning inference API** (`aqi-api-clean.onrender.com/predict`).
3. It renders the **predicted AQI** on animated gauges, generates **day / week / month forecasts**, and **pushes health alerts** when the air turns dangerous.

The app is built as a multi-page **Next.js 15 App Router** application with feature-sliced, clean-architecture scaffolding so each domain (predictions, live smog, analytics, history, authentication) can grow independently.

---

## 💡 Why We Built It

- 🏔️ **Regional need** — Cities in Azad Kashmir like Kotli and Mirpur face severe winter smog, yet residents have no easy, localized way to know *what the air will be like tomorrow*, not just today.
- 🧠 **ML, not guesswork** — AQI is computed from 15 pollutant & meteorological features by a trained regression model, giving data-driven forecasts instead of static readings.
- 🔔 **Proactive alerts** — When AQI crosses 101, the app immediately notifies users with severity-specific health guidance ("Unhealthy for Sensitive Groups" → "Hazardous").
- 🧩 **Educational + extensible** — The codebase doubles as a reference architecture: feature-sliced modules, DI-ready structure (`inversify`), centralized testing with **k6 load/stress suites** — showing how a real ML product is engineered end-to-end.

---

## ⚙️ How It Works

### The Prediction Pipeline

```plaintext
┌─────────────────────────────────────────────────────────────────────┐
│                          USER BROWSER                                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │              Next.js 15 Frontend (this repo)                  │  │
│  │                                                               │  │
│  │  1. PICK  → random sensor reading from the sample dataset     │  │
│  │     (sensor-data.ts: SO₂, CO, O₃, PM10, PM2.5, NO₂, NOx,     │  │
│  │      NO, wind speed/direction, 8hr & avg variants)            │  │
│  │                                                               │  │
│  │  2. POST  → axios POST /predict (JSON, 15s timeout)           │  │
│  │                                                               │  │
│  │  3. READ  ← { "predicted_aqi": <number> }                     │  │
│  │                                                               │  │
│  │  4. FORECAST → derive day / week / month outlooks             │  │
│  │                                                               │  │
│  │  5. ALERT  → if AQI > 101, severity-matched toast + advice    │  │
│  │                                                               │  │
│  │  6. RENDER → animated gauge (SVG ring), forecast cards,       │  │
│  │             Recharts trend line                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                          ▲ every 10 seconds (auto-refresh)          │
└──────────────────────────┼──────────────────────────────────────────┘
                           │ HTTPS
              ┌────────────▼─────────────┐
              │   ML Inference API       │
              │   (hosted on Render)     │
              │   aqi-api-clean          │
              │   .onrender.com/predict  │
              │                          │
              │  • Trained regression    │
              │    model (scikit-learn)  │
              │  • Input: 15 pollutant   │
              │    features              │
              │  • Output: predicted AQI │
              └──────────────────────────┘
```

### Request flow (Predictions page — the core)

1. **`FuturePredictions.tsx`** picks a random sample from `src/features/predictions/utils/sensor-data.ts` (a realistic dataset of sensor readings).
2. It `POST`s the sample as JSON to `process.env.NEXT_PUBLIC_AQI_API_URL` (falls back to the hosted Render endpoint).
3. On success: the AQI is rendered on a **pulsing SVG gauge**, and three forecast cards (Tomorrow / Next Week / Next Month) plus a **Recharts line chart** show the trend.
4. **Health alerts** fire when AQI > 101, using the US EPA bands: a color-coded toast with severity-appropriate advice (limit outdoor activity → avoid all outdoor activity).
5. **Resilience**: on network failure the UI falls back to a safe default (AQI 120), shows an error banner + toast, and retries once after 2 seconds.
6. The cycle repeats every **10 seconds**, giving a near-live prediction feed per selected location.

---

## ✨ Key Features

| Module | What it does |
|---|---|
| 🔮 **Predictions** (`/Predictions`) | Live AQI gauge, day/week/month forecast cards, forecast trend chart, location selector (9 AJK cities), auto-refresh every 10 s, health-alert toasts |
| 🎛️ **AQI Display** (`/AqiDisplay`) | Full pollutant breakdown — 15 readings with units (µg/m³ / ppm), animated SVG gauge with level color coding |
| 📡 **Live Smog** (`/LiveSmog`) | Live smog monitoring panel with continuous data polling |
| 📊 **Analytics** (`/Analytics`) | Air-quality trend analytics, aggregates and chart summaries |
| 🕘 **History** (`/History`) | Historical prediction logs — view, filter and export past readings |
| 🔐 **Authentication** (`/Login`, `/Signup`) | Animated login/signup screens (GSAP starfield, Framer Motion) — routing into the app with protected-flow structure |
| 👤 **Profile** (`/Profile`) | User profile card with cover photo, social links and download actions |
| 👥 **Creators** (`/Creator`) | Team showcase page with GSAP scroll-driven animations |
| 📱 **Responsive shell** | Collapsible sidebar + navbar, mobile overlay menu, scrollbar-hidden layouts |

---

## 🏗️ System Architecture

### High-level

```plaintext
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│   Next.js 15 App Router · React 19 · TypeScript · Tailwind  │
│                                                              │
│   ┌─────────────┐ ┌─────────────┐ ┌───────────────────────┐  │
│   │ app/ routes │ │  features/  │ │      core/ + config/  │  │
│   │ (pages)     │ │ (per-domain │ │  DI container, utils, │  │
│   │             │ │  modules)   │ │  env, constants       │  │
│   └─────────────┘ └─────────────┘ └───────────────────────┘  │
│        presentation ──► domain ──► data (clean arch)         │
└──────────────────────────────┬───────────────────────────────┘
                               │ axios (JSON over HTTPS)
┌──────────────────────────────▼───────────────────────────────┐
│                      ML SERVICE LAYER                        │
│              FastAPI-style inference service                 │
│              Render · POST /predict                          │
│              scikit-learn regression model                   │
│              in: 15 pollutant features → out: AQI            │
└──────────────────────────────────────────────────────────────┘
```

### Feature-sliced clean architecture (per feature)

Each feature module is organized in layers so UI never talks directly to network details, and data sources can be swapped (local ↔ remote) without touching pages:

```plaintext
features/<domain>/
├── data/
│   ├── datasources/      # concrete API / storage access (.gitkeep — ready)
│   ├── repositories/     # repository implementations
│   ├── models/           # DTOs / data models
│   └── errors/           # typed failure states
├── domain/
│   ├── datasources/      # local-datasources / remote-datasources contracts
│   └── repositories/     # repository interfaces
└── presentation/
    ├── pages/            # route-level screens
    ├── components/       # reusable UI (gauges, cards, nav)
    ├── hooks/            # stateful logic
    └── store/            # Redux Toolkit slices (scaffolded)
```

> **Status:** the layered skeleton (with `inversify` DI + Redux Toolkit in `package.json`) is scaffolded and ready; the live pages currently implement the presentation layer directly against the prediction API.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 15** (App Router, `next.config.ts`) |
| UI | **React 19**, **TypeScript 5**, **Tailwind CSS 3** |
| Charts | **Recharts** (line charts), custom **SVG gauges** |
| Animation | **Framer Motion**, **GSAP** (+ ScrollTrigger) |
| Components | **MUI (Emotion)**, `react-icons`, `lucide-react` |
| State / data | **Redux Toolkit**, **Axios**, `react-hot-toast` |
| DI (scaffolded) | **Inversify** |
| Testing | **k6** load & stress suites (`src/testing/`) |
| ML backend | Python ML model served via **Render** (separate service) |

---

## 🔌 API Contract

### `POST /predict` — Predict AQI

**Base URL:** `NEXT_PUBLIC_AQI_API_URL` (default: `https://aqi-api-clean.onrender.com/predict`)

**Request** — `application/json`, one object per sensor reading:

```json
{
  "so2": 0.35, "co": 15.8, "o3": 0.25, "o3_8hr": 0.21,
  "pm10": 432.0, "pm2_5": 185.5, "no2": 0.71, "nox": 0.95,
  "no": 0.45, "windspeed": 1.2, "winddirec": 90.0,
  "co_8hr": 12.3, "pm2_5_avg": 165.0, "pm10_avg": 410.0, "so2_avg": 0.31
}
```

**Response:**

```json
{ "predicted_aqi": 187.42 }
```

**Client behavior:** 15 s timeout · one automatic retry (after 2 s) on failure · fallback AQI of `120` + visible error state if the service is unreachable.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) the prediction API running locally, or use the hosted Render endpoint

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/sardar-mukhshaf/SmogPrediction.git
cd SmogPrediction

# 2. Install dependencies
npm install

# 3. Configure the API endpoint (optional — has a hosted default)
#    create .env.local in the project root:
echo "NEXT_PUBLIC_AQI_API_URL=http://localhost:8000/predict" > .env.local

# 4. Start the dev server
npm run dev        # → http://localhost:3000

# 5. Production build
npm run build
npm start
```

> The entry route `/` lazy-loads the **Predictions** page, which immediately starts fetching live predictions.

---

## 📁 Project Structure

```plaintext
SmogPrediction/
├── public/                         # Static assets & app imagery
├── src/
│   ├── app/                        # Next.js App Router routes
│   │   ├── page.tsx                # "/" → Predictions (lazy-loaded)
│   │   ├── Predictions/page.tsx    # Forecast dashboard
│   │   ├── AqiDisplay/page.tsx     # Pollutant breakdown + gauge
│   │   ├── LiveSmog/page.tsx       # Live smog monitoring
│   │   ├── Analytics/page.tsx      # Trend analytics
│   │   ├── History/page.tsx        # Prediction history & export
│   │   ├── Login/  Signup/         # Auth screens
│   │   ├── Profile/                # User profile
│   │   ├── Creator/                # Team showcase
│   │   ├── layout.tsx              # Root layout & metadata
│   │   └── globals.css             # Tailwind entry
│   ├── config/                     # Env & API client (ready)
│   ├── core/                       # DI container + shared utils (ready)
│   ├── features/                   # Feature-sliced modules (see above)
│   │   ├── predictions/            # Core: sensor data, ML client UI, interfaces
│   │   ├── AQI-display/            # Gauge + pollutant list + nav shell
│   │   ├── live-smog/              # Live monitoring UI
│   │   ├── analytics/              # Charts & aggregates
│   │   ├── history/                # Logs, filters, export
│   │   ├── authentication/         # Login / signup
│   │   ├── profile/                # Profile page
│   │   └── specials/               # Creators page
│   └── testing/                    # k6 load & stress suites
├── result.json                     # Sample k6 load-test output
├── next.config.ts · tailwind.config.ts · tsconfig.json
└── package.json
```

---

## 🧪 Load & Stress Testing (k6)

The prediction endpoint is continuously validated with **k6** suites in `src/testing/`:

```bash
# Load test — ramp to 500 VUs, p(95) < 7s, error rate < 10%
k6 run src/testing/load-testing.ts

# Stress test — escalating 10 → 80 VUs, randomized payloads
k6 run src/testing/stress-testing.ts
```

`result.json` in the repo root shows a real run against the production API: **100% of requests returned HTTP 200** with `p(95)` latency well under the 7 s threshold and a 0% failure rate.

---

## 🎚️ AQI Reference

The app maps predictions to the US EPA AQI bands and reacts accordingly:

| AQI | Level | Color | App behavior |
|---|---|---|---|
| 0–50 | Good | 🟢 Green | Normal display |
| 51–100 | Moderate | 🟡 Yellow | Normal display |
| 101–150 | Unhealthy for Sensitive Groups | 🟠 Orange | ⚠️ Toast: limit prolonged outdoor activity |
| 151–200 | Unhealthy | 🔴 Red | 🚨 Toast: sensitive groups avoid outdoors |
| 201–300 | Very Unhealthy | 🟣 Purple | ☣️ Toast: avoid outdoor activities |
| 301+ | Hazardous | 🩷 Pink | 💀 Toast: avoid **all** outdoor activities |

---

## 🗺️ Roadmap

- [ ] Wire authentication to a real backend (currently UI + routing only)
- [ ] Fill in data/domain layers (`datasources`, `repositories`, DI bindings)
- [ ] Replace `setInterval` polling with **WebSockets** for true real-time push
- [ ] Persist prediction history to a database and power the History export
- [ ] Location-aware sensor feeds per AJK city instead of sampled data
- [ ] Publish the ML training pipeline & model card (separate repo)

---

## 📸 Screenshots

App imagery is included in [`public/`](public/) (see the WhatsApp screenshots dated 2025-06-18).

---

## 👨‍💻 Authors

Built with ❤️ by the team featured on the in-app **Creators** page (`/Creator`).

---

<div align="center">

**⭐ If this project helps you understand ML-driven air-quality systems, consider starring the repo!**

</div>
