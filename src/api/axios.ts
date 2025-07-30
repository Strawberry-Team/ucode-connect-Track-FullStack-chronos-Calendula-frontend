import axios, { AxiosError } from "axios";
import store from "@/components/redux/store";
import { logout } from "@/components/redux/reducers/authReducer";

// Define the environment
const isProduction = import.meta.env.PROD;

// Configure the API URL based on the environment
const BASE_URL = isProduction 
    ? '/api' // For production, use relative path
    : `${import.meta.env.VITE_API_BASE_URL}/api`; // For development
    
const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
