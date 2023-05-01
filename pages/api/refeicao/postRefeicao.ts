import {PrismaClient} from "@prisma/client";

export async function postRefeicao(prisma:PrismaClient, idUser:number, payload:any){
    const [d, m, y] = payload.data.split('/');


    let dataAlimento: any = {
        user: {
            connect: {
                id:idUser
            }
        },
        tipo: {
            connect: {
                id: payload.tipo
            }
        },
        nome: payload.nome,
        qnt: payload.quantidade,
        cal: payload.cal,
        p: payload.p,
        c: payload.c,
        g: payload.g,
        f: payload.f,
        date:new Date(`${y}-${m}-${d}:00:00`),
    }

    const createRefeicao = await prisma.tb_alimento.create({data: dataAlimento})


    return createRefeicao
}
