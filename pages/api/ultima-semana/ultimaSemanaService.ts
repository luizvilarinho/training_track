import { PrismaClient } from "@prisma/client";

export async function getUltimaSemana(prisma:PrismaClient, userId:number){
    let treinosRaw = await prisma.tb_workout.findMany({
        where: {
            userId,
            date:{
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                lte: new Date()
            }
        },
        select:{
            date: true,
            training:true
        },
        orderBy:{
            date: 'desc'
        }
    })
    
    let treinos : {description:Array<string>, consolidado:any}={
        description:[],
        consolidado:{}
    };

    let response:any = treinosRaw
    .flatMap(item => {
            return item.training
    })
    .flatMap((treino:any)=>{
        let obj = {
            description: treino.description,
            sets: treino.sets,
            type: treino.type
        }
        return [obj]
    })
    .map((item:any)=>{
        let itemDescription = item.type === 2? 'cardio' : item.description;

        if(treinos.description.includes(itemDescription)){
             treinos.consolidado[itemDescription].sets = treinos.consolidado[itemDescription].sets + item.sets
        }else{
            treinos.description.push(itemDescription)
            treinos.consolidado[itemDescription] = {sets:item.sets, type:item.type}
        }
        
        //return treinos
    })
    

    return treinos.consolidado
}