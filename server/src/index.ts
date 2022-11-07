import express, { Application, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import routes from './api/v1/routes'

dotenv.config()

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

const app: Application = express()

// middleware
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())
app.use(helmet())

// routes
app.use(routes)
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to UET-Review')
})

mongoose
  .connect(
    <string>DB_URI,
    <mongoose.ConnectOptions>{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
