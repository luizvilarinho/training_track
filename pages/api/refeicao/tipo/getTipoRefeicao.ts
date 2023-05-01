import {PrismaClient} from "@prisma/client";
import {TipoRefeicao} from "./types";

export async function getTipoRefeicao(prisma:PrismaClient){
    let response;

    try{
        const tiposRefeicao:Array<TipoRefeicao> = await prisma.tb_tipo_refeicao.findMany({
            select:{
                id:true,
                tipo:true
            }
        })

        response = tiposRefeicao
    }catch(error){
        response = {
            success:false,
            error:error
        }
    }

    return response;

}
