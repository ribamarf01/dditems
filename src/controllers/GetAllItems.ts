import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export default class GetAllItems {

  async handle(req: Request, res: Response) {
    const result = await prisma.item.findMany({})

    res.status(200).json(result)

  }

}