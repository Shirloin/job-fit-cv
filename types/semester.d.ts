import { TStudentSemester } from "./student-semester"
import { TStudentSubjectScore } from "./student-subject-score"
import { TSubject } from "./subject"

export type TSemester = {
    id: string
    name?: string
    startDate?: Date
    endDate?: Date
    semester_subjects? : TSubject[] | null
    student_subject_scores?: TStudentSubjectScore[] | null
}