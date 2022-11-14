import express, { Router } from 'express'
import * as AuthController from '../../controllers/auth.controller'

const authRouter: Router = express.Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/signup', AuthController.signup)

export default authRouter
