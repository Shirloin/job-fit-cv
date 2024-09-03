"use client";
import Layout from "@/components/Layout";
import { useLoading } from "@/providers/LoadingProvider";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, setIsLoading } = useLoading();
  useEffect(() => {
    if (isLoading) {
      toast.loading("Please Wait For A Moment");
    }
    else {
      toast.dismiss()
    }
  }, [isLoading]);
  return (
    <>
      {isLoading && (
        <div className="fixed w-screen h-screen z-50 bg-black bg-opacity-80"></div>
      )}
      <Layout>{children}</Layout>
    </>
  );
}
