import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "../middleware/auth"
import { PrismaClient } from "@prisma/client";
import { getUltimaSemana } from "./ultimaSemanaService";

const prisma:PrismaClient = new PrismaClient()

var Cookies = require('cookies')

var keys = ['keyboard cat']

async function UltimaSemana(request: NextApiRequest, response: NextApiResponse){
    
    //middleware
    var cookies = new Cookies(request, response, { keys: keys })
    var accsessToken = cookies.get('accesstoken', { signed: true })
    
    let userId = await Auth(accsessToken);
    
    if(!userId || userId.error){
        console.log("error",userId)
        response.status(401).json({success:false, message:'unauthorized'})
        return
    }

    switch(request.method){
        case 'GET':
            let treinoSemana = await getUltimaSemana(prisma, userId);

            response.status(200).json([{success:true, treinoSemana:treinoSemana}])
            // let { workoutid, calendar } = request.query;

            // if(calendar){
            //     getTreinoByDate(prisma, userId, String(calendar)).then((resp)=>{
            //         response.status(200).json(resp)
            //     }).finally(()=>{
            //         console.log("DISCONECT")
            //         prisma.$disconnect();
            //     })
            // }else if(workoutid){
            //     getTreinoById(prisma, String(workoutid)).then((resp)=>{
            //         response.status(200).json(resp)
            //     }).finally(()=>{
            //         console.log("DISCONECT")
            //         prisma.$disconnect();
            //     })
            // }else{
            //     getTreino(prisma, userId).then((resp)=>{
            //         response.status(200).json(resp)
            //     }).finally(()=>{
            //         console.log("DISCONECT")
            //         prisma.$disconnect();
            //     })

            // }
            
        break;

        default:
            response.status(400).json({message:'methodnot allowed'})
    }
}

export default UltimaSemana;