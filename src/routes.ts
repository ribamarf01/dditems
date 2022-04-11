import express from 'express'
import GetAllItems from './controllers/GetAllItems'

import GetItem from './controllers/GetItem'
import GetPageItems from './controllers/GetPageItems'

const routes = express.Router()

routes.get("/item/page", new GetPageItems().handle)
routes.get("/item/:id", new GetItem().handle)
routes.get("/item", new GetAllItems().handle)

export default routes