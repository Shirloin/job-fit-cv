"use client"

import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { TCompany } from "@/types/company"
import { exportTableToCSV } from "@/lib/export"

interface CompanyTableToolbarActionsProps {
    table: Table<TCompany>
}

export function CompanyTableToolbarActions({
    table,
}: CompanyTableToolbarActionsProps) {
    return (
        <div className="flex items-center gap-2">
            {/* <Button variant="outline" size="sm">
                <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                New Company
            </Button> */}
            {/* <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "companies",
                        excludeColumns: ["select", "actions"],
                    })
                }
            >
                <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                Export
            </Button> */}
            {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
        </div>
    )
}
