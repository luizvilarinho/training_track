import {PrismaClient} from "@prisma/client";
import { HealthData, Macros } from "./types";
import { error } from "console";

export async function postHealthData(prisma: PrismaClient, data:HealthData, userId:number){
    
    if (!data) throw new Error('Dados inválidos');

    
    try{
        let healthData:any = await prisma.tb_health_data.findUnique({
            where: {
                userId: userId
            },
            select:{
                height:true,
                weight:true,
                meta_calorias:true,
                meta_macros:{
                    select:{
                        p:true,
                        c:true,
                        g:true
                    }
                }
            }
        })

        
       let payload:any = {};

       if(healthData === null){
           payload = {
               user:{ connect: { id: userId } },
               weight: data.weight || 0,
               height:data.height  || 0,
               meta_calorias: data.meta_calorias || 0,
               meta_macros: {
                   create:{
                       p: data?.meta_macros?.p || 0,
                       c:data?.meta_macros?.c || 0,
                       g:data?.meta_macros?.g || 0,
                   }
               }
           };

           console.log("SAVEPAYLOAD", payload)
           const saveHealthData = await prisma.tb_health_data.create({data:payload})

           return saveHealthData
   
       }else{
            Object.keys(healthData).map((item) => {
                const key = item as keyof HealthData;
                console.log(key)
                if(key === 'meta_macros'){
                    if(!!data.meta_macros){
                        payload[key] = {update:{...data[key]}}
                    }else{
                        payload[key] = {update:{...healthData[key]}}
                    }
                }else if(data[key]){
                    payload[key] = data[key]
                }else{
                    payload[key] = healthData[key]
                }
            })

            console.log("UPDATEPAYLOAD", payload)
            const updateHealthData = await prisma.tb_health_data.update({
                where: {
                    userId: userId
                },
                data:payload
            })

            return updateHealthData
       }  


        // Object.keys(data).map((item:string)=>{
        //     const key = item as keyof HealthData;
            
        //     if (key === 'meta_macros') {
        //         payload[key] = data[key] as Macros; // Atribuição específica para a chave 'meta_macros'
        //       } else {
        //         payload[key] = data[key] as number; // Atribuição para outras chaves numéricas
        //       }
        // })
    
    
     
        return payload;

    }catch(e){
        console.error('Erro ao salvar dados de saúde:', e);
        return e;
    }

    

   
}

export default postHealthData;


