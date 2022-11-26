import express, { Router } from 'express'
import postRouter from './post.route'
import authRouter from './auth.route'
import profileRouter from './profile.route'
import reportRouter from './report.route'

const routeV1: Router = express.Router()

routeV1.use('/auth', authRouter)
routeV1.use('/profile', profileRouter)
routeV1.use('/posts', postRouter)
routeV1.use('/reports', reportRouter)

export default routeV1
