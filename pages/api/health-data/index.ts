import {NextApiRequest, NextApiResponse} from "next";
import {Auth} from "../middleware/auth";
import {PrismaClient} from "@prisma/client";
import postHealthData from "./postHealthData";


const prisma:PrismaClient = new PrismaClient()

const Cookies = require('cookies')

const keys = ['keyboard cat']

async function HealthData(request: NextApiRequest, response:NextApiResponse){
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
        case 'POST':
            let payload = request.body;
            let result:any = null
            try{
                let result = await postHealthData(prisma, payload, userId )
                response.status(201).json(result)

            }catch(e){
                result.error = e
                response.status(400).json(result)
            }


           
            break;

    }
}

export default HealthData;
