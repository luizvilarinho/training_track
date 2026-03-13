// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function caloriasAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch(req.method){
    case 'GET':
      console.log("RESPONSECALORIAS-1")
      let response = await fetch(`${process.env.API_CALORIAS}/api/`)
      console.log("RESPONSECALORIAS", response)
      let respJson =  await response.json()
  
     
    
      res.status(200).json(respJson)

    break;
  }


}
