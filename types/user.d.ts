import { TStudentScore } from "./student-score";
import { TStudentSemester } from "./student-semester";
import { TStudentSubjectScore } from "./student-subject-score";
import { TTech } from "./tech";
import { TProgram } from "./program";
import { JsonArray } from "@prisma/client/runtime/library";
import { TCV } from "./cv";

export type TUser = {
  id: string;
  username: string;
  role?: string
  name?: string;
  email?: string;
  gpa?: number;
  image?: string;
  campus?: string;
  student_subject_scores?: TStudentSubjectScore[] | null
  program?: TProgram | null
  cv: TCV
  emailVerified?: Date | null;
} & Partial<AdapterUser>;