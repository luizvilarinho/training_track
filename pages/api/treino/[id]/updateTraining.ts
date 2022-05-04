import { PrismaClient } from "@prisma/client";
import { Training, Workout } from "../types";


export async function updateTraining(prisma:PrismaClient, updateWorkout:any){

    //verifica se tem algum treino para apagar
    let getTreino = await prisma.tb_workout.findUnique({
        where:{id:updateWorkout.workoutId},
        select:{
            training:true
        }
    })

    let t1 = getTreino?.training.map((item:any)=>{
        return item.id
    })

    let t2 = updateWorkout.training.map((item:any)=>{
        return item.id
    })

    if(t1 && t2 && t1 > t2){
        let diferente = await t1.filter(item=>{
            if(!t2.includes(item)){
                return item
            }
        })

        diferente.map(async (item)=>{
            console.log("item", item)
            await prisma.tb_group.delete({
                where:{id: item}
            })
        })
    }
    //fim 

    
    let upTraining = await updateWorkout.training.map(async (treino:Training)=>{
        
        if(treino.id && treino.id != 0){
            await prisma.tb_group.update({
                where: {id: Number(treino.id)},
                data:{
                    type: treino.type,
                    description: treino.description,
                    sets: treino.sets,
                    tb_workoutId: updateWorkout.workoutId
                }
            }).catch((error)=>{
                console.log(error)
                return error
            })
        }else{
            await prisma.tb_group.create({
                data:{
                    type: treino.type,
                    description: treino.description,
                    sets: treino.sets,
                    tb_workoutId: updateWorkout.workoutId
                }
            }).catch((error)=>{
                console.log(error)
                return error
            })
        }

    });

     var [d, m, y] = updateWorkout.date.split('/');

    await prisma.tb_workout.update({
        where:{id: updateWorkout.workoutId},
        data:{
            date: new Date(`${y}-${m}-${d}:00:00`),
        }
    }).catch((error)=>{
        console.log(error)
        return error
    })

    let responseObject = {
        success:true,
        message: "registro alterado com sucesso"
    }
    return [responseObject]
   
    
}