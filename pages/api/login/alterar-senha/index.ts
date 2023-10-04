import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import {enviarEmail,encodemanager, fazerUpadteDaSenha} from "./alterarSenhaService"


const prisma:PrismaClient = new PrismaClient()


export default async function alterarSenha(request: NextApiRequest, response: NextApiResponse) {
    
    

    switch(request.method){

        case 'GET':
        //envio de email
        const {email} = request.query;
        
        
        enviarEmail(String(email))
            .then(() => {
                const mensagem = `Um email foi enviado para ${email}. Verifique sua caixa de entrada. Se o email não chegar, verifique se não está sinalizada como SPAM.`;
                response.status(200).json([{ success: true, mensagem }]);
            })
            .catch((error) => {
                console.error('Erro ao enviar o email:', error);
                response.status(500).json({ success: false, error: 'Erro ao enviar o email' });
            });

        //response.status(200).json({success: true, email});
        break;
        
        case 'POST':
                const { hash } = request.query;
                const { password } = request.body;

                const data = {
                    password: String(password),
                    hash: String(hash)
                }

                fazerUpadteDaSenha(prisma, data)
                    .then((result) => {
                        response.status(201).json({ result });
                    })
                    .catch((error) => {
                        response.status(500).json([{ success: false, emnsagem: 'erro ao atualizar senha', error: error }]);
                    })
               
            break;

        default:
            response.status(400).json({success: false, message: "method not allowed"})
    }
}