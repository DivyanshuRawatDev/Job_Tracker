import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_PRODUCTION_BACKEND_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
