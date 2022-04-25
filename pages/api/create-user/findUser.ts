import { PrismaClient } from "@prisma/client";

export async function findUser(prisma:PrismaClient, id:number){
    const result = await prisma.tb_user.findUnique({
        where: {id},
        select:{
            email: true,
            name: true,
            id: true
        }
      })

      let responseObject = {};

      if(result){
        responseObject = {
          user: result,
          success: true
        }
        
      }else{
        responseObject = {
          success: false,
          message: "Nenhum usuário encontrado"
        }
      }

    return responseObject
}