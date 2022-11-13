import express, { Router } from 'express'
import postRouter from './post.route'
import authRouter from './auth.route'

const routeV1: Router = express.Router()

routeV1.use('/auth', authRouter)
routeV1.use('/posts', postRouter)

export default routeV1
