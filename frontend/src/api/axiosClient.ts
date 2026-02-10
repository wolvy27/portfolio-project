import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const axiosClient = axios.create({
  baseURL: baseURL,
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt_token");
      
      // --- DEBUG LOG START ---
      console.log("🚀 [Axios] Preparing Request to:", config.url);
      console.log("🔑 [Axios] Token in Storage:", token ? "FOUND (Starts with " + token.substring(0, 10) + "...)" : "MISSING");
      // --- DEBUG LOG END ---

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        // --- DEBUG LOG ---
        console.log("✅ [Axios] Authorization Header Attached");
      } else {
        console.warn("⚠️ [Axios] sending request WITHOUT token!");
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error(`❌ [Axios] Error ${error.response.status}:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;