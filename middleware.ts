// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import {
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
//   protectedRoutes,
//   adminRoutes,
//   studentRoutes,
// } from "./routes";
// import { NextRequest, NextResponse } from "next/server";
// import { NextAuthRequest } from "next-auth/lib";
// import { getToken, GetTokenParams } from "next-auth/jwt";

// const { auth } = NextAuth(authConfig);

// export default auth(async (req) => {
//   const res = NextResponse.next();



//   const { nextUrl } = req;

//   const isLoggedIn = !!req.auth;
//   const userRole = req.auth?.user.name;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
//   const isStudentRoute = studentRoutes.includes(nextUrl.pathname);
//   const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);


//   if (nextUrl.pathname.startsWith("/api/")) {
//     return res
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return NextResponse.redirect(new URL("/", nextUrl));
//     }
//     return res
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/auth/login", nextUrl));
//   }

//   if (isProtectedRoute) {
//     if (!isLoggedIn) {
//       return NextResponse.redirect(new URL("/auth/login", nextUrl));
//     }
//   }

//   if (isAdminRoute && userRole.toLowerCase().includes("student")) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   if (isStudentRoute && userRole.toLowerCase().includes("admin")) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   return res
// });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: [
//     "/api/:path*",
//     "/",
//     "/auth/login",
//     "/company/list",
//     "/company/new",
//     "/account",
//     "/account/new",
//     "/student/list",
//     "/cv/new",
//   ],
// };

export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};