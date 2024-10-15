import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://new-crypto-compass-production.up.railway.app/", //   Replace for Hosting development:- import.meta.env.VITE_BASE_URL",
  withCredentials: true,
});

export default axiosInstance;
