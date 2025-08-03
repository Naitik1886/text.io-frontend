import axios from 'axios';

const API_BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:8005" 
  : import.meta.env.VITE_API_URL;
  const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
});

export default axiosInstance;



 