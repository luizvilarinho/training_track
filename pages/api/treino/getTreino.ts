import { PrismaClient } from "@prisma/client";


export async function getTreino(prisma:PrismaClient, userId:number){

    let workout:any = await prisma.tb_workout.findMany({
        where: {userId},
        select: {
            id: true,
            lastTraining: true,
            date: true,
            training: true
        },
        orderBy:{
            date: 'desc'
        }
    })
    
    workout.map((item:any, idx:number)=>{
        item.date = new Date(item.date).toLocaleDateString(); 
    })

    return workout
   
    
}