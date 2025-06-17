import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const requestDuration = new Trend('request_duration');

// Load Test configuration
export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users over 2 minutes
    { duration: '6m', target: 500 }, // Stay at 500 users for 6 minutes
    { duration: '2m', target: 0 },   // Ramp down to 0 users over 2 minutes
  ],
  thresholds: {
    'errors': ['rate<0.1'],           // Error rate should be less than 10%
    'http_req_duration': ['p(95)<7000'] // 95% of requests should complete below 500ms
  },
};

// Sample static payload
const payload = JSON.stringify({
  "so2": 0.35,
  "co": 15.8,
  "o3": 0.25,
  "o3_8hr": 0.21,
  "pm10": 432.0,
  "pm2_5": 185.5,
  "no2": 0.71,
  "nox": 0.95,
  "no": 0.45,
  "windspeed": 1.2,
  "winddirec": 90.0,
  "co_8hr": 12.3,
  "pm2_5_avg": 165.0,
  "pm10_avg": 410.0,
  "so2_avg": 0.31
});

// Setup function (runs once before the test)
export function setup() {
  console.log('🚀 Starting Load Test...');
  return { startTime: new Date().toISOString() };
}

// Main load function (executed by each VU)
export default function() {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(
    'https://aqi-api-clean.onrender.com/predict', 
    payload, 
    params
  );

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Record custom metrics
  errorRate.add(!success);
  requestDuration.add(res.timings.duration);

  // Log response time (optional — remove for large VUs)
  console.log(`VU ${__VU}: Response time: ${res.timings.duration}ms, Status: ${res.status}`);

  // Sleep randomly between 1-3 seconds
  sleep(Math.random() * 2 + 1);
}

// Teardown function (runs after all iterations)
interface SetupData {
    startTime: string;
}

export function teardown(data: SetupData): void {
    console.log(`✅ Load Test completed.\nStarted at: ${data.startTime}\nEnded at: ${new Date().toISOString()}`);
}
