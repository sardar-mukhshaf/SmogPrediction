import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const requestDuration = new Trend('request_duration');

export const options = {
    stages: [
        { duration: '2m', target: 10 },  // Ramp-up to 10 users over 2 min
        { duration: '2m', target: 20 },  // Ramp-up to 20 users over next 2 min
        { duration: '2m', target: 40 },  // Ramp-up to 40 users over next 2 min
        { duration: '2m', target: 80 },  // Ramp-up to 80 users over next 2 min
    ],
    thresholds: {
        'errors': ['rate<0.1'],            // error rate must be below 10%
        'http_req_duration': ['p(95)<7000'], // 95% of requests must be below 7000ms
        'http_req_failed': ['rate<0.05'], // HTTP errors should be below 5%
    },
};

// Randomized payload generator for realistic testing
function generatePayload() {
    return JSON.stringify({
        "so2": 0.35 + (Math.random() * 0.1),
        "co": 15.8 + (Math.random() * 2),
        "o3": 0.25 + (Math.random() * 0.05),
        "o3_8hr": 0.21 + (Math.random() * 0.05),
        "pm10": 432.0 + (Math.random() * 50),
        "pm2_5": 185.5 + (Math.random() * 20),
        "no2": 0.71 + (Math.random() * 0.1),
        "nox": 0.95 + (Math.random() * 0.1),
        "no": 0.45 + (Math.random() * 0.1),
        "windspeed": 1.2 + (Math.random() * 0.5),
        "winddirec": 90.0 + (Math.random() * 10),
        "co_8hr": 12.3 + (Math.random() * 2),
        "pm2_5_avg": 165.0 + (Math.random() * 20),
        "pm10_avg": 410.0 + (Math.random() * 40),
        "so2_avg": 0.31 + (Math.random() * 0.05)
    });
}

export function setup() {
    console.log('🚀 Starting stress test...');
    return { startTime: new Date().toISOString() };
}

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const payload = generatePayload();
    const response = http.post('https://aqi-api-clean.onrender.com/predict', payload, params);

    // Only check HTTP status 200 (reliable, avoids false error counts)
    const success = check(response, {
        'status is 200': (r) => r.status === 200,
    });

    // Record custom metrics
    errorRate.add(!success);
    requestDuration.add(response.timings.duration);

    // Optionally log response for debugging (disabled in production)
    // console.log(`VU: ${__VU} | Status: ${response.status} | Duration: ${response.timings.duration}ms | Body: ${response.body}`);

    // Sleep 3.05-3.2 seconds (to avoid perfect sync between VUs)
    sleep(Math.random() * 0.15 + 3.05);
}

interface SetupData {
    startTime: string;
}

export function teardown(data: SetupData): void {
    console.log(`✅ Stress test completed.\nStarted at: ${data.startTime}\nEnded at: ${new Date().toISOString()}`);
}
