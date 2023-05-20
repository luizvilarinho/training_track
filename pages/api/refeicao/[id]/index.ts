import {NextApiRequest, NextApiResponse} from "next";
import {Auth} from "../../middleware/auth";
import {PrismaClient} from "@prisma/client";
import { deleteAlimento } from "./deleteAlimento";

const prisma:PrismaClient = new PrismaClient()

const Cookies = require('cookies')

const keys = ['keyboard cat']

async function DeleteAlimento(request: NextApiRequest, response:NextApiResponse){
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
        case 'DELETE':

            let result = await deleteAlimento(prisma, userId, Number(request.query.id));

            console.log(result)
            response.status(200).json(result)

            break;
    
    }
      
}

export default DeleteAlimento;
