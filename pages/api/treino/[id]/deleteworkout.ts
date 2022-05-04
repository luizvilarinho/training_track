import { PrismaClient } from "@prisma/client";


export async function deleteWorkout(prisma:PrismaClient, workoutId:number){

    try{
        
        await prisma.tb_workout.delete({
            where: { id: workoutId },
          })

          let responseObject = {
              success:true,
              message: "registro deletado com sucesso"
          }
      
          return [responseObject]

    } catch (error) {
        return error
    }

    
}