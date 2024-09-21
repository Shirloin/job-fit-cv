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

const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
  allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
  exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
  maxAge: process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined,
  credentials: process.env?.CREDENTIALS == "true",
};

export default auth(async (req) => {
  const res = NextResponse.next();

  const origin = req.headers.get('origin') ?? ''
  console.log(origin)
  if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
  }
  res.headers.set('Access-Control-Allow-Origin', "https://job-fit-cv.shirloin.my.id");
  res.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
  res.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
  res.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
  res.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
  res.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");



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
    return res
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return res
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

  return res
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
