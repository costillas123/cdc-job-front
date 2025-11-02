import store from "@/state/store";
import axios from "axios";
import router from "@/router";

// ✅ Axios instance
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_AUTHDOMAIN,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-System-Key": process.env.VUE_APP_APIKEY,
  },
});

// ✅ Inject Bearer Token from Vuex store into every request
apiClient.interceptors.request.use((config) => {
  const token = store.state.auth.token || "";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Handle Responses & Errors (Console Only)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // 🔥 Log error details
      console.error("API Error:", {
        status,
        data: error.response.data,
        url: error.config.url,
      });

      if (status === 401) {
        console.warn("Unauthorized. Logging out in 5 seconds...");
        setTimeout(() => {
          store.commit("auth/clearUser"); 
          router.push("/login");
        }, 5000);
      }
    } else {
      // 🔥 Log network or other errors
      console.error("Network Error:", error.message);
      router.push("/page-error-500");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
