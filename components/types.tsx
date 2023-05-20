export type Iworkout = {
    id?:number | null
    date: Date | null | string
    training: Array<Workout>
    lastTraining: boolean
}

export type Workout = {
    id?:number
    type: number // cardio | bodybuilding
    description: string
    sets: number
}
export type Alimento= {
    id:number
    alimento:string
    cal:number
    p:number
    c:number
    g:number
    f:number
    tipo?:TipoALimento
    qnt?:number
    nome?:string
}

export type TipoALimento = {
    id:number,
    tipo:string
}
