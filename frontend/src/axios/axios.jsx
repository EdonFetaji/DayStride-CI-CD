// src/axios/axios.js

import axios from "axios";

// const BASE_URL =  "http://localhost:8000/api/"
const BASE_URL = "/api/"
const axiosInstance = axios.create({

    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token to request headers
axiosInstance.interceptors.request.use(
    (config) => {
        const stored = localStorage.getItem("tokens");
        if (stored) {
            try {
                const {access} = JSON.parse(stored);
                if (access) {
                    config.headers.Authorization = `Bearer ${access}`;
                }
            } catch (err) {
                console.error("Failed to parse tokens:", err);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Global response error handler with refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const stored = localStorage.getItem("tokens");
                if (stored) {
                    const {refresh} = JSON.parse(stored);
                    if (refresh) {
                        const res = await axios.post(
                            `${BASE_URL}token/refresh/`,
                            {refresh}
                        );
                        const newTokens = res.data;
                        localStorage.setItem("tokens", JSON.stringify(newTokens));
                        axiosInstance.defaults.headers.Authorization = `Bearer ${newTokens.access}`;
                        originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
                        return axiosInstance(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem("tokens");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
