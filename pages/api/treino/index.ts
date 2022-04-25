import type { NextApiRequest, NextApiResponse } from "next";

type Iworkout = {
    id:string
    date: Date
    workouts: Array<Workout>
    lastTrainig: boolean
}

type Workout = {
    type: string // cardio | bodybuilding
    description: string
    sets: string
}

const dataMock: Iworkout = {
    id: "rash0213sdasd",
    date: new Date('04/22/2022'),
    lastTrainig: true,
    workouts: [
        {
            type: 'bodybuilding',
            description: 'peitoral',
            sets: '12'
        },
        {
            type: 'bodybuilding',
            description: 'tríceps',
            sets: '0'
        },
        {
            type: 'bodybuilding',
            description: 'bíceps',
            sets: '0'
        },
        {
            type: 'bodybuilding',
            description: 'deltóide',
            sets: '12'
        },
        {
            type: 'bodybuilding',
            description: 'perna',
            sets: '0'
        },
        {
            type: 'bodybuilding',
            description: 'costas',
            sets: '0'
        },
        {
            type: 'bodybuilding',
            description: 'core',
            sets: '12'
        },
        {
            type: 'cardio',
            description: 'esteira',
            sets: '35'
        }
        
    ]
}

function treinoHandler(request: NextApiRequest, response: NextApiResponse){
    
    response.status(200).json(dataMock)
}

export default treinoHandler;