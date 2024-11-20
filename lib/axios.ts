import primaryAxios from "axios";
import { getSession } from "next-auth/react";
import { isTokenValid } from "./utils";

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

const axios = primaryAxios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(async (config) => {
  if (isServer) {
    const { headers } = await import("next/headers");

    const token = headers().get("authorization");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    const session = await getSession();

    if (session && session.user && session.user.token) {
      const token = session.user.token;

      if (isTokenValid(token)) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        window.location.href = "/unauthorized";
        throw new Error("Token expired. Redirecting to /unauthorized.");
      }
    }
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isServer) {
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  },
);

export default axios;
