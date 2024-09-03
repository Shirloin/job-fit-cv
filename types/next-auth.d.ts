import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { TUser } from "./user";

declare module "next-auth" {
  interface Session extends DefaultSession {
    role: string,
    user: TUser & {
      role?: string;
    };
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: TUser;
    role: string;
  }
}
