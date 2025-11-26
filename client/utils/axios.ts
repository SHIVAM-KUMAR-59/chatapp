import axios, { AxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to attach token before every request
api.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // Fetch session on each request
    const token = session?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await signOut({ redirect: false });
      // Redirect to signin page
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  },
);

export default api