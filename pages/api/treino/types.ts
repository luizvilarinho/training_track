export type Workout = {
    id?:number
    date: string
    training?: Array<Training>
    lastTraining: boolean
    userId?:number
}

export type Training = {
    id?: number
    group_type: string // cardio | bodybuilding
    description: string
    sets: string
    workoutId?:number
}