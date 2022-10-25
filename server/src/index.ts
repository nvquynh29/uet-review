import express, { Application, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

const app: Application = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to UET-Review')
})

// middleware
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

// mongoose
//   .connect(<string>DATABASE_URI, <mongoose.ConnectOptions>{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to DB')
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`)
//     })
//   })
//   .catch((err) => {
//     console.error(err)
//   })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
