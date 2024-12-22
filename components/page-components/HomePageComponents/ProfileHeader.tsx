"use client";

/* eslint-disable @next/next/no-img-element */

import { TUser } from "@/types/user";

export default function ProfileHeader({ user }: { user: TUser }) {
  return (
    <>
      <div className="flex my-2">
        <div className="min-w-20 h-20 sm:w-44 sm:h-44  mr-4 md:mr-8 transition-all duration-100">
          <img
            className="w-full h-full rounded-full "
            src={user?.image}
            alt=""
          />
        </div>
        <div className="self-end">
          <h1 className="text-header">Welcome, {user?.name}</h1>
          <h1 className="text-sub-header">{user?.username}</h1>
          <h1 className="text-sub-header">{user?.program?.name}</h1>
        </div>
      </div>
    </>
  );
}
