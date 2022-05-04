import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkForUser } from './checkForUser';
import Cookies from 'cookies'

const prisma:PrismaClient = new PrismaClient()


export default async function createUser(request: NextApiRequest, response: NextApiResponse) {
    
    

    switch(request.method){

        case 'POST':

            var keys = ['keyboard cat']

            checkForUser(prisma, request.body).then((resp)=>{

                var cookies = new Cookies(request, response, { keys: keys })
                cookies.set('accesstoken', resp.token, { signed: true });

                console.log("RESPLOGIN", resp)
                response.status(200).json(resp)

            }, (error)=> {
                console.log(error);
                response.status(400).json(error)
            
            });
            
            break;

        default:
            response.status(400).json({success: false, message: "method not allowed"})
    }
}