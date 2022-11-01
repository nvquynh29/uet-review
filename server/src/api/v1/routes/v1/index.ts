import express, { Router } from 'express'
import userRouter from './user.route'
import postRouter from './post.route'

const routeV1: Router = express.Router()

routeV1.use('/users', userRouter)
routeV1.use('/posts', postRouter)

export default routeV1
