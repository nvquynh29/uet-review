import { Request, Response } from 'express'
import { Document, Types } from 'mongoose'
import Post, { IPost, IReview } from '../models/post.model'
import { generateSlug } from '../../../pkg/slugify'

const createPost = async (req: Request, res: Response) => {
  const body = req.body
  const post: IPost = {
    author_id: new Types.ObjectId(body.author_id),
    subject_id: new Types.ObjectId(body.subject_id),
    lecturer_id: new Types.ObjectId(),
    title: body.title,
    content: body.content,
    reviews: new Types.DocumentArray<IReview>([]),
    tags: [],
  }

  body.reviews.forEach(function (review: IReview) {
    post.reviews.push(review)
  })

  body.tags.forEach(function (tag: string) {
    post.tags?.push(tag)
  })

  post.slug = generateSlug(post.title)
  const newPost = await Post.create(post)
  return res.json({ data: newPost })
}

const getPost = async (req: Request, res: Response) => {
  const { slug } = req.params
  const post = await Post.findOne({ slug })
  if (post == null) {
    return res.sendStatus(404)
  }

  const author = {
    nickname: 'Trịnh Mai Huy',
    email: 'trinh.mai.huy@gmail.com',
  }
  return res.json({ post, author })
}

const getListPost = async (req: Request, res: Response) => {
  const posts = await Post.find()
  const data: any = []
  const author = {
    nickname: 'Trịnh Mai Huy',
    email: 'trinh.mai.huy@gmail.com',
  }
  posts.forEach(post => {
    data.push({
      post,
      author
    })
  })

  return res.json(data)
}

export { createPost, getPost, getListPost }
