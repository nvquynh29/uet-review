import express, { Router } from 'express'
import * as UserController from '../../controllers/user.controller'

const userRouter: Router = express.Router()

userRouter.post('/', UserController.createUser)

export default userRouter
