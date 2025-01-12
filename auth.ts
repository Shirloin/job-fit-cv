import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import { adminRoutes, authRoutes, protectedRoutes, publicRoutes, studentRoutes } from "./routes";
import { NextResponse } from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token }) {
      session.user = token.user

      return session
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }
      return token;
    },
    async authorized({ request: { nextUrl, headers }, auth }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl
      const role = auth?.user?.role || 'user'

      const isAuthRoute = authRoutes.includes(pathname);
      const isAdminRoute = adminRoutes.includes(pathname);
      const isStudentRoute = studentRoutes.includes(pathname);
      const isProtectedRoute = protectedRoutes.includes(pathname);
      const isApiRoute = pathname.includes("api")
      const referer = headers.get("referer")
      const allowedOrigin = process.env.NEXT_PUBLIC_BASE_PATH as string
      const allowedOtherOrigin = process.env.NEXT_PUBLIC_OTHER_PATH as string

      if (isApiRoute && (!referer || (!referer.startsWith(allowedOrigin) && !referer.startsWith(allowedOtherOrigin)))) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      if (isApiRoute) {
        return true;
      }

      if (!isLoggedIn && (isAdminRoute || isStudentRoute || isProtectedRoute)) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
      }

      if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/", nextUrl));
      }
      if (role.toLowerCase().includes("admin") && isStudentRoute) {
        return NextResponse.redirect(new URL("/", nextUrl));
      }
      if (role.toLowerCase().includes("student") && isAdminRoute) {
        return NextResponse.redirect(new URL("/", nextUrl));
      }

      return !!auth;

    }
  },
  trustHost: true
});
