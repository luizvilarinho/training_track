import { PrismaClient } from "@prisma/client";

export async function deleteUser(prisma: PrismaClient, id:number){
    
    let responseObject:any = {};

    try{
        let user = await prisma.tb_user.delete({
            where: { id },
            select:{
                id: true
            }
        })

        responseObject.message = "Usuário deletado";
        responseObject.success = true
        responseObject.userId = user
        
        return responseObject;

    }catch(e){
        console.log("ERROR", e)
        responseObject.message = "Nenhum usuário encontrado";
        responseObject.success = false
        responseObject.error = e
        return responseObject;
    }
    
}