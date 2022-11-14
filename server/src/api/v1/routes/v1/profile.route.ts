import express, { Router } from 'express'
import * as ProfileController from '../../controllers/profile.controller'
import isAuth from '../../middlewares/auth.middleware'

const profileRouter: Router = express.Router()

profileRouter.get('/', [isAuth], ProfileController.getProfile)

export default profileRouter
