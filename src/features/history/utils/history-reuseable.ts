export const aqiLevels = [
  { level: "Good", range: "0-50", color: "green" },
  { level: "Moderate", range: "51-100", color: "yellow" },
  { level: "Unhealthy for Sensitive Groups", range: "101-150", color: "orange" },
  { level: "Unhealthy", range: "151-200", color: "red" },
  { level: "Very Unhealthy", range: "201-300", color: "purple" },
  { level: "Hazardous", range: "301+", color: "pink" },
];

export const getAQILevel = (value: number) => {
  if (value <= 50) return aqiLevels[0];
  if (value <= 100) return aqiLevels[1];
  if (value <= 150) return aqiLevels[2];
  if (value <= 200) return aqiLevels[3];
  if (value <= 300) return aqiLevels[4];
  return aqiLevels[5];
};
