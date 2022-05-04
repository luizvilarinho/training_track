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