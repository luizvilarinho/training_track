import { PrismaClient } from "@prisma/client";

export async function deleteAlimento(prisma: PrismaClient, idUser:number, id:number){

    let response;
    try{
         await prisma.tb_alimento.deleteMany({
                where: {
                    id: id
                }
            })
        
        //console.log(deleteAlimento)

        response = {
            success:true,
        };

    }catch(e){
        response = {
            success:false,
            error: e
        }
    }

    return response
}