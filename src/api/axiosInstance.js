import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/api", // Spring Boot backend URL
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  //(error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use((response) => response, error => {
    if (error.response?.status === 401) {
      // Optional: clear invalid token
      localStorage.removeItem("token");

      // Redirect to login page
      window.location = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;