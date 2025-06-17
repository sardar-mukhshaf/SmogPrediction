export interface ForecastType {
  day: number;
  week: number;
  month: number;
}

export interface AQILevel {
  level: string;
  range: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  aqi: number;
}

export interface SensorData {
  [key: string]: number | string;
}


export interface ForecastCardProps {
  title: string;
  value: number;
}
