import { TSemester } from "./semester"
import { TSubject } from "./subject"
import { TUser } from "./user"

export type TStudentSubjectScore = {
    id: string
    score?: double
    student?: TUser | null
    semester?: TSemester | null
    subject?: TSubject | null
} 