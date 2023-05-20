// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function calcularCalorias(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch(req.method){
        case 'POST':
            let response = await fetch(`${process.env.API_CALORIAS}/api/calcular`, {
                'method': 'POST',
                'headers':{
                    "Content-type": "application/json"
                },
                'body':JSON.stringify(req.body)
            })
        
            let respJson =  await response.json()
        
           
          
            res.status(200).json(respJson)
            break;

    }


}
