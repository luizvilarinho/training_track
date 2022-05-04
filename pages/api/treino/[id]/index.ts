import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "../../middleware/auth"
import { PrismaClient } from "@prisma/client";
import { updateTraining } from "./updateTraining";
import { deleteWorkout } from "./deleteworkout"

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
            response.status(200).send({success: request.query, message:"no response"})
            
        break;

       case "PUT":
        //response.status(200).json({message:'PUT'})

            updateTraining(prisma, request.body).then((resp)=>{
                response.status(200).json(resp)
            }).finally(()=>{
                console.log("DISCONECT")
                prisma.$disconnect();
            })
            
            break;
        
        case "DELETE":

            deleteWorkout(prisma, Number(request.query.id)).then((resp)=>{
                response.status(200).json(resp)
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