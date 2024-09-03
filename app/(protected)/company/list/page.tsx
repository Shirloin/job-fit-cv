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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDataTable } from "@/hooks/use-data-table";
import { CompanyService } from "@/services/CompanyService";
import { TCompany } from "@/types/company";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CompanyTable } from "./_components/company-table";
import {
  useFetchAllCompanies,
  useFetchAllPositions,
  useFetchAllPrograms,
} from "@/hooks/use-fetch-data";

export default function CompanyListPage() {
  const {
    data: companies,
    isLoading: isLoadingCompanies,
    isError: isErrorCompanies,
  } = useFetchAllCompanies();
  const {
    data: programs,
    isLoading: isLoadingPrograms,
    isError: isErrorPrograms,
  } = useFetchAllPrograms();
  const {
    data: positions,
    isLoading: isLoadingPositions,
    isError: isErrorPositions,
  } = useFetchAllPositions();

  const isLoading =
    isLoadingCompanies || isLoadingPrograms || isLoadingPositions;
  const isError =
    isErrorCompanies ||
    isErrorPrograms ||
    isErrorPositions

  return (
    <ContentLayout title="Company List">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Company List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="mb-2 text-destructive text-xs font-semibold">
            <p>Note:</p>
            <p>Company with recommended status is just a suggestion</p>
            <p>You are free to apply to any company that aligns with your interests and carrer goals</p>
          </div>
          <div className="flex justify-center items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            {isLoading ? (
              <div className="my-auto">Loading...</div>
            ) : isError ? (
              <div className="my-auto">Error loading data</div>
            ) : (
              companies &&
              programs &&
              positions && (
                <CompanyTable
                  companies={companies}
                  programs={programs}
                  positions={positions}
                />
              )
            )}
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
