import express from 'express'

import routes from './routes'

const app = express()
app.use(express.json())
app.use(routes)

const PORT = 8080

app.listen(PORT, () => {
  console.log(`🔥 Server running at port ${PORT}`)
})