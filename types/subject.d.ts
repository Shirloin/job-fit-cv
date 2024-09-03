import { TSemester } from "./semester"
import { TStudentSubjectScore } from "./student-subject-score"
import { TTech } from "./tech"

export type TSubject = {
    id: string
    name?: string
    type?: string
    student_subject_score?: TStudentSubjectScore[] | null
    semesters?: TSemester[] | null
    techs?: TTech[] | null
}