import { PrismaClient } from "@prisma/client";
import { Workout } from "./types";

export async function postTreino(prisma:PrismaClient, userId:number, payload: Workout){
    
    var [d, m, y] = payload.date.split('/');

    let payloadParser = payload.training?.map((treino)=>{
        if(treino.id === 0){
            return { type: treino.type, // cardio | bodybuilding
                description: treino.description,
                sets: treino.sets
            }
        }
    })

    console.log("payloadParser",payloadParser);

    let dataWorkout: any = {
        user: {
            connect:{
                id: userId
            }
        },
        lastTraining: payload.lastTraining,
        date: new Date(`${y}-${m}-${d}:00:00`),
        training:{
            createMany:{
                data: payloadParser
            }
        },
        
       
    }

    const createWorkout = await prisma.tb_workout.create({data:dataWorkout, include:{training:true}})


    return createWorkout;
 

}