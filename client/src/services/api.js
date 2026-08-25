import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://travelwebbie.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically send JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = "Bearer " + token;
  }

  return req;
});

export default API;
