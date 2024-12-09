"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { signOut } from "@/auth"

export const logOut = async () => {
  await signOut({ redirect: false })
}

export const logIn = async (username: string, password: string) => {
  try {
    await signIn("credentials", {
      username,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message }
    }
    throw error
  }
};
