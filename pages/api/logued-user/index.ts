import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "../middleware/auth"
import { PrismaClient } from "@prisma/client";

const prisma:PrismaClient = new PrismaClient()

var Cookies = require('cookies')

var keys = ['keyboard cat']

async function loguedUser(request: NextApiRequest, response: NextApiResponse){
    
    //middleware
    var cookies = new Cookies(request, response, { keys: keys })

    var accsessToken = null;
    accsessToken =  request.headers?.cookie?.split('=')[1] || ''
    // if(request.headers && request.headers.cookie){
    //     accsessToken = request.headers.cookie.split('')[1]
    // }else{
    //     accsessToken = cookies.get('accesstoken', { signed: true })
    // }
    
    let userId = await Auth(accsessToken,);
    console.log("GETUSER", userId)
    if(!userId || userId.error){
        console.log("error",userId)
        response.status(401).json({success:false, message:'unauthorized'})
        return
    }

    switch(request.method){
        case 'GET':
            console.log("LOGGED")
            try{
                let user:any = await prisma.tb_user.findUnique({
                    where: {id: Number(userId)},
                    select:{
                        email:true,
                        name:true
                    }
                })
            
                response.status(200).json([user])
        
            }catch (error) {
                return error
            }finally{
                prisma.$disconnect()
            }
            
        break;

       

        default:
            response.status(400).json({message:'methodnot allowed'})
    }
}

export default loguedUser;