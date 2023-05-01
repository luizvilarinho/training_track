import {NextApiRequest, NextApiResponse} from "next";
import {Auth} from "../middleware/auth";
import {PrismaClient} from "@prisma/client";
import {postRefeicao} from "./postRefeicao";
import {getRefeicaoByDate} from "./getRefeicao";

const prisma:PrismaClient = new PrismaClient()

const Cookies = require('cookies')

const keys = ['keyboard cat']

async function RefeicaoHandler(request: NextApiRequest, response:NextApiResponse){
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

            let result = await postRefeicao(prisma, userId, payload)


            response.status(201).json(result)

            break;

        case 'GET':
            let { data }:any = request.query
            let getRefeicaoResult = await getRefeicaoByDate(prisma, data, userId);

            response.status(200).json(getRefeicaoResult)

            break;
    }
}

export default RefeicaoHandler;
