import "./globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryClientProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LoadingProvider>
              <QueryProvider>
                <Toaster />
                {children}
              </QueryProvider>
            </LoadingProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
