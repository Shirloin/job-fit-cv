"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { semestersData } from "@/data/UserData";
import { TStudentSubjectScore } from "@/types/student-subject-score";
import { TSemester } from "@/types/semester";

export default function UserScore() {
  const [semesters, setSemesters] = useState<TSemester[]>([]);

  useEffect(() => {
    setSemesters(semestersData);
  }, []);

  return (
    <>
      <div className="capitalize">
        <h1 className="text-3xl font-medium">Your Score</h1>
        <Tabs defaultValue="semester-1" className="w-fit flex flex-col mt-6">
          <TabsList className="px-2 py-6">
            {semesters.map((semester, i) => (
              <TabsTrigger
                className="px-4 py-2"
                key={i}
                value={`semester-${i + 1}`}
              >
                {`Semester ${i + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
          {semesters.map((semester, i) => (
            <TabsContent className="" key={i} value={`semester-${i + 1}`}>
              <Table className="bg-secondary rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Course Name</TableHead>
                    <TableHead className="w-32 text-center">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semester.student_subject_scores!.map((res, j) => (
                    <TableRow className="hover:bg-gray-200" key={j}>
                      <TableCell className="font-medium ">
                        {res.subject?.name}
                      </TableCell>
                      <TableCell className="text-center">{res.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
