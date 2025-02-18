'use client';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { TCompany } from '@/types/company';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import DeleteCompany from './delete-company';
import { useState } from 'react';
import UpdateCompanySheet from './update-company-sheet';
import { TProgram } from '@/types/program';

export function getCompanyColumns(
  programs: TProgram[],
  user: any
): ColumnDef<TCompany>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Company Name" />;
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    // {
    //   accessorFn: (row) => row.program?.name,
    //   accessorKey: "program",
    //   header: ({ column }) => {
    //     return <DataTableColumnHeader column={column} title="Program" />;
    //   },
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("program")}</div>
    //   ),
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    {
      accessorFn: (row) => (row.position!.name ? row.position!.name : null),
      accessorKey: 'position',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Position" />;
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('position')}</div>
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorFn: (row) =>
        user?.role.toLowerCase() !== 'student' ? row.status : 'N/A',
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            className="justify-center"
            column={column}
            title="Status"
          />
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('status')}</div>
      ),
    },
    ...(user && user.role.toLowerCase().includes('admin')
      ? [
          {
            id: 'actions',
            header: 'Action',
            cell: function Cell({ row }: { row: Row<TCompany> }) {
              const [showCompany, setShowCompany] = useState(false);

              return (
                <>
                  <UpdateCompanySheet
                    programs={programs}
                    company={row.original}
                    open={showCompany}
                    onOpenChange={setShowCompany}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => setShowCompany(true)}>
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DeleteCompany company={row.original} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              );
            },
          },
        ]
      : []),
  ];
}
