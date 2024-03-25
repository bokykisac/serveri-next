import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({ req });
    const isAuth = !!token;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("authorization", `${token?.token}`);

    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/unauthorized");

    if (!isAuth) {
      if (isAuthPage) {
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

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
