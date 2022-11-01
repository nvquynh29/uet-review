import express, { Router } from 'express'
import routeV1 from './v1'
const routes: Router = express.Router()

routes.use('/v1', routeV1)

export default routes
