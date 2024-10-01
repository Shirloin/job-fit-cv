'use client'
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { getSession, useSession } from "next-auth/react";
import { auth } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ReactNode, useEffect, useState } from "react";

export default function PlaceholderContent({ children }: { children: ReactNode }) {


  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex relative">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}