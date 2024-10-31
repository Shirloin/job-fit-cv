"use client";
import { useDataTable } from "@/hooks/use-data-table";
import { TCompany } from "@/types/company";
import { DataTableFilterField } from "@/types/data-table";
import { useEffect, useMemo, useState } from "react";
import { getCompanyColumns } from "./company-table-columns";
import { CompanyTableToolbarActions } from "./company-table-toolbar-actions";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { TProgram } from "@/types/program";
import { TPosition } from "@/types/position";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CompanyTableProps {
  companies: TCompany[];
  programs: TProgram[];
  positions: string[];
}

export function CompanyTable({
  companies,
  programs,
  positions,
}: CompanyTableProps) {
  const user = useCurrentUser()
  const columns = useMemo(
    () => getCompanyColumns(programs, user),
    [programs, user]
  );

  const data = useMemo(() => companies, [companies])

  const filterFields: DataTableFilterField<any>[] = useMemo(
    () => [
      {
        label: "Company Name",
        value: "name",
        placeholder: "Filter company...",
      },
      {
        label: "Program",
        value: "program",
        options: programs.map((program) => ({
          label: program.name![0].toUpperCase() + program.name!.slice(1),
          value: program.name!,
          withCount: true,
        })),
      },
      {
        label: "Position",
        value: "position",
        options: positions.map((position) => ({
          label: position!,
          value: position!,
          withCount: true,
        })),
      },
    ],
    [programs, positions]
  );

  const { table } = useDataTable<TCompany, unknown>({
    data: data,
    columns,
    pageCount: 10,
    defaultPerPage: 10,
    filterFields,
    defaultSort: "status.desc",
  });

  return (
    <>
      <DataTable className="min-w-full" table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <CompanyTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
