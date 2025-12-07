import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : "http://localhost:4000");

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;