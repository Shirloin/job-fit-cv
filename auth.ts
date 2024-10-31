import NextAuth, { User } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import UserRepository from "./repositories/UserRepository";
import { TUser } from "./types/user";
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
    async session({ session, token }) {
      session.user = token.user

      return session
      // if (token.sub) {
      //   session.user.id = token.sub;
      // }
      // if (token.user) {
      //   // session.role = token.user.role as string
      //   session.user.id = token.user.id as string;
      //   session.user.username = token.user.username as string;
      //   session.user.email = token.user.email as string | null;
      //   session.user.role = token.user.role as string | null;
      //   session.user.name = token.user.name as string | null;
      //   session.user.nim = token.user.nim as string | null;
      //   session.user.image = token.user.image as string | null;
      // }
      // return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }
      return token;
      // if (token.sub) {
      //   const user = await UserRepository.getUserById(token.sub);
      //   if (user) {
      //     token.user = user;
      //   }
      // }
      // return token;
    },
    async authorized({ request: { nextUrl, headers }, auth }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl
      const role = auth?.user.role || 'user'

      const isAuthRoute = authRoutes.includes(pathname);
      const isAdminRoute = adminRoutes.includes(pathname);
      const isStudentRoute = studentRoutes.includes(pathname);
      const isProtectedRoute = protectedRoutes.includes(pathname);
      const isApiRoute = pathname.includes("api")
      const referer = headers.get("referer")
      const allowedOrigin = process.env.NEXT_PUBLIC_BASE_PATH as string

      if (isApiRoute && (!referer || !referer.startsWith(allowedOrigin))) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
