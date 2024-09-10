import { PrismaClient } from "@prisma/client";
import { toEUALocaleDate } from "../../../utils/parseDate";


export async function getTreinoByDate(prisma:PrismaClient, userId:number, date:string){

    try{
        const [d, m, y] = date.split('/');
        //console.log("CALENDAR", userId, date, toEUALocaleDate(date))
        let workout:any = await prisma.tb_workout.findFirst({
            where: {
                date: new Date(`${y}-${m}-${d}:00:00`),
                userId:userId
            },
            select:{
                date:true,
                training:true
            }
        })
        
        console.log("workout", workout)
        //console.log('SQL:', prisma.$queryRaw`SELECT * FROM tb_workout WHERE date = ${new Date(toEUALocaleDate(date))} AND userId = ${userId}`);
        workout.date = new Date(workout.date).toLocaleDateString()

        if(workout){
            return [workout]
        }

    }catch (error) {
        return  []
    }
   
    
}