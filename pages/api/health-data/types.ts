import { tb_meta_macros } from "@prisma/client"

export interface HealthData{
    weight: number
    height:number
    meta_calorias: number
    meta_macros?: Macros
    user:any

}

export interface Macros{
    p: number,
    c:number
    g:number
}