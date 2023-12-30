import axios from "axios";

const BASE_URL_DEVELOPMENT = import.meta.env.VITE_REACT_APP_BASE_URL_DEVELOPMENT;

const BASE_URL_PRODUCTION = import.meta.env.VITE_REACT_APP_BASE_URL_PRODUCTION;

const BASE_URL = import.meta.env.MODE === "production" ? BASE_URL_PRODUCTION : BASE_URL_DEVELOPMENT;

const mode = import.meta.env.MODE;

console.log("This is ", mode,BASE_URL_DEVELOPMENT, BASE_URL_PRODUCTION)

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;