import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({ req });
    const hasToken = !!token?.token;

    let isTokenValid = false;

    if (hasToken) {
      const payload = token?.token.split(".")[1];
      const decodedPayload = atob(payload);
      const decodedToken = JSON.parse(decodedPayload);

      isTokenValid = decodedToken.exp
        ? decodedToken.exp * 1000 > Date.now()
        : false;
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("authorization", `${token?.token}`);

    // Define routes that are accessible without authentication or authorization
    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/unauthorized");

    if (!hasToken || !isTokenValid) {
      // If token is missing or expired, redirect to /unauthorized or allow access to auth pages
      if (isAuthPage) {
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }

      // Redirect to /unauthorized if token is invalid/expired
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // If the user has a valid token, proceed with the request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);
