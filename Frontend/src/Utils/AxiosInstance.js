import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", //   Replace for Hosting development:- import.meta.env.VITE_BASE_URL",
  withCredentials: true,
});

export default axiosInstance;
