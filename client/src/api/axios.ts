const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";


export const api = axios.create({
  baseURL: `${API_URL}/api/v1/users`,
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});
