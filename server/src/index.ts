import express, { Application, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import DB_URI from './config/database.config'

dotenv.config()

const PORT = process.env.PORT

const app: Application = express()

// middleware
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())
app.use(helmet())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to UET-Review')
})

app.get('/api/healthz', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    'status': 'OK',
  })
})

console.log(`uri => ${DB_URI}` )
mongoose
  .connect(<string>DB_URI, <mongoose.ConnectOptions>{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
