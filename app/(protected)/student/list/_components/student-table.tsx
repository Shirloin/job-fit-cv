import { useDataTable } from "@/hooks/use-data-table";
import { DataTableFilterField } from "@/types/data-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { StudentTableToolbarActions } from "./student-table-toolbar-actions";
import { getStudentColumns } from "./student-table-columns";
import { TUser } from "@/types/user";
import { TProgram } from "@/types/program";

interface StudentTableProps {
  students: TUser[]
  programs: TProgram[]
}

export function StudentTable({ students, programs }: StudentTableProps) {
  const columns = useMemo(() => getStudentColumns(programs), [programs]);
  const filterFields: DataTableFilterField<any>[] = [
    {
      label: "Search student",
      value: "username",
      placeholder: "Search student...",
    },
    {
      label: "Major",
      value: "program",
      options: programs.map((program) => ({
        label: program.name![0].toUpperCase() + program.name!.slice(1),
        value: program.name!,
        withCount: true,
      })),
    },
  ];

  const { table } = useDataTable<TUser, unknown>({
    data: students,
    columns,
    pageCount: 10,
    defaultPerPage: 10,
    filterFields,
  });

  return (
    <>
      <DataTable className="min-w-full" table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <StudentTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
