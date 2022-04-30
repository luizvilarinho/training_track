import { PrismaClient } from "@prisma/client";
import {userLoginType} from "./types";

var jwt = require('jsonwebtoken');


export async function checkForUser(prisma:PrismaClient,  user:userLoginType){
    const result = await prisma.tb_user.findUnique({
        where: {email: user.email},
        select:{
            email: true,
            name: true,
            id: true,
            password: true
        }
    })

    let responseObject;
    if(result){

        if(result.password === user.password){
            console.log("ENV", process.env.JWTSECRET)
            var token = jwt.sign({data: result.id,}, process.env.JWTSECRET, {expiresIn:'30d'});

            responseObject = {
                success:true,
                message: 'usuário encontrado',
                user: result,
                token
            }
        }else{
            responseObject = {
                success: false,
                message: 'senha incorreta'
            }
        }
    }else{
        responseObject = {
            success:false,
            message: 'usuário não encontrado'
        }
    }

    return responseObject
}