/* eslint-disable @next/next/no-img-element */
"use client";
import { logIn } from "@/actions/AuthAction";
import { Button } from "@/components/ui/button";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await logIn(username, password);
      if (res?.error) {
        toast.error(res.error);
      } else {
        await update()
        toast.success("Login Success");
        router.replace("/")
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col z-20">
        <div className="z-10 my-auto w-fit flex flex-col px-6 sm:px-10 py-4 sm:py-8 box-border self-center border border-black rounded-lg shadow-xl">
          <div className="mx-auto w-full flex flex-col items-center">
            <img
              className="w-24 sm:w-32 object-fill mb-4 sm:mb-8 self-start"
              src="/assets/logo.png"
              alt=""
            />
            <form className="w-[240px] sm:w-80">
              <div className="flex flex-col sm:my-2">
                <label className="pb-2 font-semibold" htmlFor="username">
                  Username
                </label>
                <input
                  className="p-2 ring-1 ring-black rounded-md"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-col my-2">
                <label className="pb-2 font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="p-2 ring-1 ring-black rounded-md"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Button
                type="button"
                onClick={handleSubmit}
                className="w-full my-2 py-4"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
