// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma: PrismaClient = new PrismaClient()

import { create } from './create';
import { deleteUser } from './deleteUser';
import { findUser } from './findUser';
import { getUsers } from './getUsers';


type Data = {
  name: string
}

export default async function createUser(request: NextApiRequest, response: NextApiResponse) {

  let idParse = Number(request.query.id);

  switch (request.method) {
    case 'POST':

      create(prisma, request.body).then(async (resp) => {
        response.status(201).json({ success: true })
      })
        .catch((e) => {
          response.status(400).json({ success: false, message: e.message || String(e) })
        }).finally(() => {
          prisma.$disconnect()
        })

      break;

    case 'GET':

      if (request.query.id) {

        findUser(prisma, idParse).then((resp) => {
          response.status(200).json(resp)
        }).finally(async () => {
          await prisma.$disconnect()
        })

      } else {

        getUsers(prisma).then((resp) => {
          console.log("RESP", resp)
          response.status(200).json({ users: resp })
        })
          .catch((e) => {
            throw e
          })
          .finally(async () => {
            await prisma.$disconnect()
          })

      }

      break;

    case 'DELETE':

      deleteUser(prisma, idParse).then((resp) => {
        response.status(200).json(resp)
      }).finally(() => {
        prisma.$disconnect()
      })

      break;

    default:
      response.status(400).json({ message: 'method not allowed' })
      console.log("not allowed");

  }

}
