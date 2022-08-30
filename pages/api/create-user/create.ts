import { PrismaClient } from "@prisma/client"
import { UserType } from "./types"

export async function create(prisma:PrismaClient, body:UserType) {
  console.log("BODY", body)
    

    let data = {
      email: body.email,
      name: body.name,
      password: body.password
    }

    console.log("DATA", data)
    await prisma.tb_user.create({data})

    return data;
  }
