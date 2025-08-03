import axios from 'axios';

const API_BASE_URL = import.meta.env.MODE === "production" 
  ? import.meta.env.VITE_API_URL
  :"http://localhost:8005" ;
  const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
});

export default axiosInstance;


import.meta.env.VITE_API_URL;
 