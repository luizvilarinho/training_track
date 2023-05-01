import {PrismaClient} from "@prisma/client";
import {alimentoType} from "../types";

export async function postCalcularCaloriasDia(prisma: PrismaClient, data:string, userId:number){
    console.log("exec", data)
    try{
        let [d,m,y] = data.split('/')
        let response;

        let refeicoesDia: Array<alimentoType> = await prisma.tb_alimento.findMany({
            where: {
                userId: userId,
                date: new Date(`${y}-0${m}-${d}`)
            },
            select: {
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

        if(refeicoesDia && refeicoesDia.length > 0){
            let cal:Array<number> = []
            let p:Array<number> = []
            let c:Array<number> = []
            let g:Array<number> = []
            let f:Array<number> = []

            refeicoesDia.map((item)=>{
                cal.push(item.cal)
                p.push(item.p)
                c.push(item.c)
                g.push(item.g)
                f.push(item.f)
            })

            response = {
                success: true,
                cal: cal.reduce((acc, cur) => acc + cur),
                p: p.reduce((acc, cur) => acc + cur),
                c: c.reduce((acc, cur) => acc + cur),
                g: g.reduce((acc, cur) => acc + cur),
                f: f.reduce((acc, cur) => acc + cur),
            }

        }else{
            response = {mensagem: "nenhuma refeicao no dia cadastrada", success: false}
        }

        return response;

    }catch(error){
        console.log("error",error)
        return error
    }
}

export default postCalcularCaloriasDia;
