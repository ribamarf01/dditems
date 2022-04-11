import express from 'express'

import GetItem from './controllers/GetItem'
import GetPageItems from './controllers/GetPageItems'

const routes = express.Router()

routes.get("/item", new GetPageItems().handle)
routes.get("/item/:id", new GetItem().handle)

export default routes