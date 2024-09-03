import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTable } from "@/hooks/use-data-table";
import { useFetchStudentScore } from "@/hooks/use-fetch-data";
import { TStudentSubjectScore } from "@/types/student-subject-score";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columns: ColumnDef<TStudentSubjectScore, any>[] = [
  {
    accessorFn: (row) => row.subject?.name || "",
    id: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Subject Name" />;
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorFn: (row) => row.score || 0,
    id: "score",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Score" />;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("score")}</div>
    ),
  },
];

export default function Score() {
  const { data: scores, isLoading } = useFetchStudentScore();

  const [selectedSemester, setSelectedSemester] = useState(0)

  const [groupedScores, setGroupedScores] = useState<TStudentSubjectScore[][]>([]);

  useEffect(() => {
    if (scores) {
      const result: Record<string, TStudentSubjectScore[]> = {};

      scores.forEach((score: TStudentSubjectScore) => {
        const semesterId = score.semester?.id;
        if (semesterId) {
          if (!result[semesterId]) {
            result[semesterId] = [];
          }
          result[semesterId].push(score);
        }
      });
      const values = Object.values(result)
      setGroupedScores(values);
    }
  }, [scores]);

  const data = groupedScores[selectedSemester] || [];

  const { table } = useDataTable<TStudentSubjectScore, unknown>({
    data,
    columns,
    pageCount: 10,
    defaultPerPage: 10,
  });

  return (
    <>
      <Tabs defaultValue="0" className="w-full">
        <TabsList>
          {Object.keys(groupedScores).map((semesterId, index) => (
            <TabsTrigger value={semesterId} key={semesterId} onClick={()=>setSelectedSemester(index)}>
              Semester {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        {
            isLoading && <div className="text-center">Loading...</div>
        }
        {Object.keys(groupedScores).map((semesterId, index) => {
            return (
                <TabsContent key={`content-${semesterId}`} value={semesterId}>
                  <div className="rounded-md border" key={`${semesterId}`}>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                return (
                                  <TableHead key={header.id}>
                                    {header.isPlaceholder
                                      ? null
                                      : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                        )}
                                  </TableHead>
                                );
                              })}
                            </TableRow>
                          ))}
                        </TableHeader>
                        <TableBody>
                          {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                              <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={table.getAllColumns().length}
                                className="h-24 text-center"
                              >
                                No results.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              )
        }
        )}
      </Tabs>
    </>
  );
}
