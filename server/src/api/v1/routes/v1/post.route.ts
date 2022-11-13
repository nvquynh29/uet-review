import express, { Router } from 'express'
import * as PostController from '../../controllers/post.controller'
import isAuth from '../../middlewares/auth.middleware'

const postRouter: Router = express.Router()

postRouter.post('/', [isAuth], PostController.createPost)
postRouter.get('/', PostController.getListPost)
postRouter.get('/:slug', PostController.getPost)
postRouter.post('/:id/comment', [isAuth], PostController.commentPost)

export default postRouter
