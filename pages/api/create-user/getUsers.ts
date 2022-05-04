import { PrismaClient } from "@prisma/client"


export async function getUsers(prisma:PrismaClient) {
    const allUsers = await prisma.tb_user.findMany()


    
    return [allUsers]
}

