import express, { Router } from 'express'
import * as AuthController from '../../controllers/auth.controller'
import isAuth from '../../middlewares/auth.middleware'

const authRouter: Router = express.Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/signup', AuthController.signup)
authRouter.get('/logout', [isAuth], AuthController.logout)

export default authRouter
