import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import prisma from "./prisma/prisma";
import { TUser } from "./types/user";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        if (username.trim().length === 0 || password.trim().length === 0) {
          throw new Error("All fields must be filleds");
        }

        const user = await prisma.user.findFirst({
          where: {
            username: {
              equals: username,
              mode: 'insensitive',
            },
          }
        });
        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return user
      },
    }),
  ],
} satisfies NextAuthConfig;
