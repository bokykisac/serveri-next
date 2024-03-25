import primaryAxios from "axios";
import { getSession } from "next-auth/react";

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

    // const token = headers().get("authorization");

    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
  } else {
    const session = await getSession();

    // if (session && session.user && session.user.token) {
    //   const token = session.user.token;
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
  }

  return config;
});

// TODO: find how to intercept axios client side 401 errors
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (isServer) {
//       const { redirect } = await import("next/navigation");
//       if (error.response.status === 401) {
//         redirect("/unauthorized");
//       }
//       return error;
//     }
//   },
// );

export default axios;
