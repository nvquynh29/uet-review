import express, { Router } from 'express'
import * as ReportController from '../../controllers/report.controller'
import isAuth from '../../middlewares/auth.middleware'

const reportRouter: Router = express.Router()

reportRouter.post('/', [isAuth], ReportController.reportPost)
reportRouter.get('/', ReportController.getListReport)

export default reportRouter
