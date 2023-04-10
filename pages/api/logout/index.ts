import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "../middleware/auth"
import { PrismaClient } from "@prisma/client";

const prisma:PrismaClient = new PrismaClient()

var Cookies = require('cookies')

var keys = ['keyboard cat']

async function loguedUser(request: NextApiRequest, response: NextApiResponse){
    
    //middleware
    var cookies = new Cookies(request, response, { keys: keys })
    var accsessToken = cookies.get('accesstoken', { signed: true })
    
    let userId = await Auth(accsessToken);
    
    if(!userId || userId.error){
        response.status(401).json({success:false, message:'unauthorized'})
        return
    }

    switch(request.method){
        case 'GET':
            cookies.set('accesstoken', '')
            response.status(200).json([{success:true}])
            
        break;

       

        default:
            response.status(400).json({message:'methodnot allowed'})
    }
}

export default loguedUser;