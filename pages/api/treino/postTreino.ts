import { PrismaClient } from "@prisma/client";
import { Workout } from "./types";

export async function postTreino(prisma:PrismaClient, userId:number, payload: Workout){
    
    var [d, m, y] = payload.date.split('/');
    console.log("PAYLOAD", payload.training)

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
                data: payload.training
            }
        },
        
       
    }

    const createWorkout = await prisma.tb_workout.create({data:dataWorkout, include:{training:true}})


    return createWorkout;
 

}