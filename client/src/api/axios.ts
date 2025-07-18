import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
