import { PrismaClient, Prisma } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export default class GetPageItems {

  async handle(req: Request, res: Response) {

    const { take, skip, order } = req.query

    const orderedBy: Prisma.SortOrder = order === 'desc' ? 'desc' : 'asc'

    const result = await prisma.item.findMany({
      take: Number(take),
      skip: Number(skip),
      orderBy: {
        name: orderedBy
      }
    })

    res.status(200).json(result)

  }

}