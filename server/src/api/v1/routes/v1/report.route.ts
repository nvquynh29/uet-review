import express, { Router } from 'express'
import * as ReportController from '../../controllers/report.controller'
import isAdmin from '../../middlewares/admin.middleware'
import isAuth from '../../middlewares/auth.middleware'

const reportRouter: Router = express.Router()

reportRouter.post('/', [isAuth], ReportController.reportPost)
reportRouter.get('/', [isAuth, isAdmin], ReportController.getListReport)

export default reportRouter
