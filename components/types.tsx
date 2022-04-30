export type Iworkout = {
    id:number
    date: Date | null
    workouts: Array<Workout>
    lastTrainig: boolean
}

export type Workout = {
    type: number // cardio | bodybuilding
    description: string
    sets: number
}