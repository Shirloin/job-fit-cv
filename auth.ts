import NextAuth, { User } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import UserRepository from "./repositories/UserRepository";
import { TUser } from "./types/user";

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
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.user) {
        session.role = token.user.role as string
        session.user.id = token.user.id as string;
        session.user.username = token.user.username as string;
        session.user.email = token.user.email as string | null;
        session.user.role = token.user.role as string | null;
        session.user.name = token.user.name as string | null;
        session.user.nim = token.user.nim as string | null;
        session.user.image = token.user.image as string | null;
      }
      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await UserRepository.getUserById(token.sub);
        if (user) {
          token.user = user;
        }
      }
      return token;
    },
    async authorized({ auth }) {
      return !!auth
    }
  },
  trustHost: true
});
