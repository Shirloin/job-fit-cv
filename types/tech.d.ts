import { TPosition } from "./position"
import { TSubject } from "./subject"
import { TUser } from "./user"

export type TTech = {
    id: string
    name?: string
    image?: string
    students?: TUser[] | null
    subjects?: TSubject[] | null
    positions?: TPosition[] | null
}