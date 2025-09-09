# SmogPrediction — Frontend

SmogPrediction is a frontend client for a smog/air-quality prediction system. It collects sensor or user inputs, interfaces with a prediction API, visualizes live Air Quality Index (AQI), displays historical predictions, and provides user authentication and configuration options. Built as a multi-page Single Page Application (SPA) with modularized features for analytics, live displays, history, and prediction workflows.

## Live Demo

[SmogPrediction Live Demo](https://smog-prediction.netlify.app/) *(Note: Replace with actual deployment URL once available)*

## Quick Start

1. **Install Dependencies**  
   ```bash
   npm install
   ```

2. **Run Development Server**  
   ```bash
   npm start
   ```

3. **Build for Production**  
   ```bash
   npm run build
   ```

## Environment Setup

- Create a `.env` file in the frontend root directory to configure the API base URL for predictions.
- Example `.env` (for Vite):
  ```
  VITE_API_URL=http://localhost:8000/api/predict
  ```

## API Integration

- **Prediction Endpoint**: Single POST endpoint for predictions.
  - Sends JSON input and expects JSON output with prediction results and metadata.
- **Centralized API Logic**: Store API-related code in `src/services` or `src/config` for easy swapping and testing.

## Primary Features

- **Live AQI Display**: Real-time AQI updates with visual widgets.
- **Prediction Workflow**: Input forms and results display for air quality predictions.
- **Authentication**: Login, logout, and optional user settings management.
- **Historical Predictions**: View, filter, and export past predictions and logs.
- **Analytics**: Charts and summaries for air quality trends and insights.

## Folder Structure

```plaintext
frontend/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Root app logic, routing, and global providers
│   ├── config/                # API client, constants, and environment settings
│   ├── features/
│   │   ├── analytics/         # Charts, aggregates, and analytics pages
│   │   ├── aqi-display/       # Live AQI widgets, gauges, and visual components
│   │   ├── authentication/    # Login, signup, token handling, and protected routes
│   │   ├── history/           # Historical predictions, logs, and export features
│   │   ├── livesmog/          # Live smog monitoring UI with polling/WebSocket logic
│   │   ├── predictions/       # Prediction input forms and results pages
│   │   └── components/        # Shared UI components
│   ├── services/              # API call wrappers and network utilities
│   ├── testing/               # Test cases
│   ├── index.{js,jsx,ts,tsx}  # Entry point
│   └── App.{js,jsx,ts,tsx}    # Main app component
├── .env                       # Environment variables (not committed)
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Module Breakdown

- **`app/`**: Manages global state, routing, and application bootstrap.
- **`config/`**: Stores environment settings, API base URL, and feature flags.
- **`analytics/`**: Contains chart components, data aggregation, and analytics pages.
- **`aqi-display/`**: Displays live AQI with gauges, color-coded visuals, and tooltips.
- **`authentication/`**: Handles login/signup forms, auth context, hooks, and token storage.
- **`history/`**: Provides UI for listing, filtering, and exporting historical predictions.
- **`livesmog/`**: Implements live data fetching via polling or WebSockets with UI panels.
- **`predictions/`**: Manages input forms, API request builders, and prediction result displays.

## Development Notes

- **API Centralization**: Keep API calls in `src/services` or `src/config` to simplify mocking and testing.
- **Environment Security**: Do not commit `.env` files with sensitive data. Only store non-sensitive URLs.
- **Error Handling**: Implement error handling and loading states for all network requests.
- **Live Data**: If using WebSockets, abstract socket logic into `livesmog/` or `services/socket.js`.
