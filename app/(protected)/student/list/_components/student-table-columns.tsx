"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { TCompany } from "@/types/company";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { TUser } from "@/types/user";
import { useState } from "react";
import StudentCVSheet from "./student-cv-sheet";
import UpdateStudentSheet from "./update-student-sheet";
import { TProgram } from "@/types/program";
import DeleteStudent from "./delete-student";
import { Checkbox } from "@/components/ui/checkbox";

export function getStudentColumns(
  programs: TProgram[]
): ColumnDef<TUser>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="NIM" />;
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Name" />;
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Email" />;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorFn: (row) => row.program?.name,
      accessorKey: "program",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Program" />;
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("program")}</div>
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "campus",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Campus" />;
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("campus")}</div>
      ),
    },
    {
      header: "Action",

      cell: function Cell({ row }) {
        const [showStudentCV, setShowStudentCV] = useState(false);
        const [showSheet, setShowSheet] = useState(false)
        return (
          <>
            {
              showStudentCV &&
              <StudentCVSheet student={row.original} open={showStudentCV} onOpenChange={setShowStudentCV} />
            }
            <UpdateStudentSheet programs={programs} student={row.original} open={showSheet}
              onOpenChange={setShowSheet} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setShowStudentCV(true)}>CV</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowSheet(true)}>Edit</DropdownMenuItem>
                <DropdownMenuItem>
                  <DeleteStudent student={row.original} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
