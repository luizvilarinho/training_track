import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "../middleware/auth"
import { PrismaClient } from "@prisma/client";

const prisma:PrismaClient = new PrismaClient()

var Cookies = require('cookies')

var keys = ['keyboard cat']

async function loguedUser(request: NextApiRequest, response: NextApiResponse){
   
    var accsessToken: string | undefined;
    let headerAccessToken = String(request?.headers?.ttaccess || '')
    var cookies = new Cookies(request, response, { keys: keys })

    if(headerAccessToken){
        accsessToken = headerAccessToken
        cookies.set('accesstoken', accsessToken, { signed: true });
    }else{
        //var cookies = new Cookies(request, response, { keys: keys })
        accsessToken =  cookies.get('accesstoken', { signed: true })
        console.log(accsessToken)
    }

    console.log("cookies.accsessToken", accsessToken )

    //console.log("COOKIES", request.headers)
    // try{
    //     let access:any = request?.headers?.ttaccess
    //     accsessToken = access || '';
    // }catch(e){
    //     accsessToken = request.headers?.cookie?.split('=')[1] || ''
    // }
    // if(request.headers && request.headers.cookie){
    //     accsessToken = request.headers.cookie.split('')[1]
    // }else{
    //     accsessToken = cookies.get('accesstoken', { signed: true })
    // }
    //console.log("TOKEN", accsessToken)
    let userId = await Auth(String(accsessToken));

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
                        name:true,
                        health_data: {
                            select:{
                                weight:true,
                                height: true,
                                meta_calorias:true,
                                meta_macros:{
                                    select:{
                                        p:true,
                                        c:true,
                                        g:true
                                    }
                                }
                            }
                        }
                    },
                })
                console.log("USER", user)
                response.status(200).json([{success:true, user}])
        
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