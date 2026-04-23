const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const isProd = import.meta.env.PROD;
const productionFallbackApi = "https://riffinity.onrender.com";

export const API_BASE_URL = rawApiBaseUrl && rawApiBaseUrl.length > 0
  ? rawApiBaseUrl.replace(/\/+$/, "")
  : isProd
    ? productionFallbackApi
    : "http://localhost:8080";
