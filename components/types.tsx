export type Iworkout = {
    id:string
    date: Date | null
    workouts: Array<Workout>
    lastTrainig: boolean
}

export type Workout = {
    type: string // cardio | bodybuilding
    description: string
    sets: string
}