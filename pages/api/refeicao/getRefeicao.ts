import {PrismaClient} from "@prisma/client";
import {alimentoType} from "./types";

export async function getRefeicaoByDate(prisma: PrismaClient, date:string, userId:number){
    try{
        let [d,m,y] = date.split('/')
        let refeicoes: Array<alimentoType> = await prisma.tb_alimento.findMany({
            where: {
                userId: userId,
                date: new Date(`${y}-0${m}-${d}`)
            },
            select: {
                id:true,
                nome: true,
                qnt:true,
                cal: true,
                p: true,
                c:true,
                g: true,
                f:true,
                date: true,
                tipo:{
                    select:{
                        id:true,
                        tipo:true
                    }
                }
            }
        })

        refeicoes.map(async (item:any)=>{
            // item.tipo = await prisma.tb_tipo_refeicao.findFirst({
            //     where:{ id: item.tipoId}
            // })

            item.date = new Date(item.date).toLocaleDateString();
        })

        return refeicoes;

    }catch(error){
        return error
    }
}

export default getRefeicaoByDate;
