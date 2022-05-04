import { PrismaClient } from "@prisma/client";


export async function getTreinoById(prisma:PrismaClient, workoutid:string){

    try{
        let workout:any = await prisma.tb_workout.findUnique({
            where: {id: Number(workoutid)},
            select:{
                date:true,
                training:true
            }
        })
    
        workout.date = new Date(workout.date).toLocaleDateString()
        return [workout]

    }catch (error) {
        return error
    }
   
    
}