import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  protectedRoutes,
  adminRoutes,
  studentRoutes,
} from "./routes";
import { NextRequest, NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth/lib";
import { getToken, GetTokenParams } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user.name;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isStudentRoute = studentRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);


  if (nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
  }

  if (isAdminRoute && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isStudentRoute && userRole !== "student") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/api/:path*",
    "/",
    "/auth/login",
    "/company/list",
    "/company/new",
    "/account",
    "/account/new",
    "/student/list",
    "/cv/new",
  ],
};