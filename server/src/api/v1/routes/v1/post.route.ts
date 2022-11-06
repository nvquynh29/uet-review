import express, { Router } from 'express'
import * as PostController from '../../controllers/post.controller'

const postRouter: Router = express.Router()

postRouter.post('/', PostController.createPost)
postRouter.get('/', PostController.getListPost)
postRouter.get('/:slug', PostController.getPost)
postRouter.post('/:id/comment', PostController.commentPost)

export default postRouter
