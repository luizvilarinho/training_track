export type Workout = {
    id?:number
    date: string
    training?: Array<Training>
    lastTraining: boolean
    userId?:number
}

export type Training = {
    id?: number
    type: number // cardio | bodybuilding
    description: string
    sets: number
    workoutId?:number
}