"use client";
import { ContentLayout } from "@/components/panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { StudentTable } from "./_components/student-table";
import { useFetchAllPrograms, useFetchAllStudents } from "@/hooks/use-fetch-data";
import { useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { UserService } from "@/services/UserService";

export default function StudentListPage() {

  const { data: students, isLoading: isLoadingStudents, isError: isErrorStudents } = useFetchAllStudents();
  const { data: programs, isLoading: isLoadingPrograms, isError: isErrorPrograms } = useFetchAllPrograms();



  return (
    <>
      <ContentLayout title="Student List">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Student List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="rounded-lg border-none mt-6">
          <CardContent className="p-6">
            <div className="flex justify-center items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              {isLoadingStudents && isLoadingPrograms ? (
                <div className="my-auto">Loading...</div>
              ) : (
                <div className="w-full flex flex-col justify-center items-center relative">
                  {
                    students && programs && <StudentTable students={students} programs={programs} />
                  }
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  );
}