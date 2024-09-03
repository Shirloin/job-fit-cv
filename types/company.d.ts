import { TPosition } from "./position"
import { TProgram } from "./program"

export type TCompany = {
    id: string
    name?: string
    industry?: string
    image?: string
    status?: string
    position?: TPosition 
    program?: TProgram
}