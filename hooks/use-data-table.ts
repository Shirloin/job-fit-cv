import { DataTableFilterField } from "@/types/data-table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface UseDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageCount: number;
  defaultPerPage?: number;
  defaultSort?: `${Extract<keyof TData, string | number>}.${"asc" | "desc"}`;
  filterFields?: DataTableFilterField<TData>[];
  enableAdvancedFilter?: boolean;
  onDelete?: () => void
}

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  defaultPerPage = 10,
  defaultSort,
  filterFields = [],
  enableAdvancedFilter = false,
  onDelete,
}: UseDataTableProps<TData, TValue>) {
  const initialSort = defaultSort
    ? [
      {
        id: defaultSort.split('.')[0] as string,
        desc: defaultSort.split('.')[1] === 'desc',
      },
    ]
    : [];
  const [sorting, setSorting] = useState<SortingState>(initialSort);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableGrouping: true,
    getGroupedRowModel: getGroupedRowModel(),
    state: {
      sorting,
      columnFilters,
    },

  });
  return { table };
}
