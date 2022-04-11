import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export default class GetItem {

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const result = await prisma.item.findUnique({
        where: {
          id: id
        }
      })

      !result ? 
      res.status(404).send({ error: 'not found'}) : res.status(302).json(result)
  
    } catch(e) {
      res.status(444).json({
        error: "not found"
      })
    }

  }

}