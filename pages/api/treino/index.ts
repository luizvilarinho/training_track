import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "../middleware/auth"
import { getTreino } from "./getTreino";
import { PrismaClient } from "@prisma/client";
import { postTreino } from "./postTreino";

const prisma:PrismaClient = new PrismaClient()

var Cookies = require('cookies')

var keys = ['keyboard cat']

async function treinoHandler(request: NextApiRequest, response: NextApiResponse){
    
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
            //gettreino
            getTreino(prisma, userId).then((resp)=>{
                response.status(200).json(resp)
            }).finally(()=>{
                console.log("DISCONECT")
                prisma.$disconnect();
            })
            
        break;

        case'POST':
            let payload = request.body;
            
            postTreino(prisma, userId, payload).then((resp:any)=>{
                response.status(201).json(resp)
            }).catch((error)=>{
                console.log("ERROR", error)
                response.status(400).json(error)
            }).finally(()=>{
                console.log("DISCONECT")
                prisma.$disconnect();
            })

        break;

        default:
            response.status(400).json({message:'methodnot allowed'})
    }
}

export default treinoHandler;