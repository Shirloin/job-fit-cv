import { TCompany } from "./company"
import { TTech } from "./tech"

export type TPosition = {
    id: string
    name?: string
    companies?: TCompany[]  | null
    techs?: TTech[] | null
}