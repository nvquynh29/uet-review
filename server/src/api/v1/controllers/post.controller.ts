import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import Post, { IPost, IReview } from '../models/post.model'
import { generateSlug } from '../../../pkg/slugify'
import { IPagination } from '../types'
import Comment, { IComment } from '../models/comment.model'

const createPost = async (req: Request, res: Response) => {
  const body = req.body
  const post: IPost = {
    author_id: new Types.ObjectId(body.user),
    subject_id: undefined,
    lecturer_id: new Types.ObjectId(body.lecturer),
    title: body.title,
    content: body.content,
    reviews: new Types.DocumentArray<IReview>([]),
    tags: [],
  }

  if (body.subject != '') {
    post.subject_id = new Types.ObjectId(body.subject)
  }
  if (body.lecturer != '') {
    post.lecturer_id = new Types.ObjectId(body.lecturer)
  }

  body.reviews.forEach(function (review: IReview) {
    post.reviews.push(review)
  })

  // body.tags.forEach(function (tag: string) {
  //   post.tags?.push(tag)
  // })

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

  const comments = await Comment.find({ post_id: post._id })

  const author = {
    nickname: 'Trịnh Mai Huy',
    email: 'trinh.mai.huy@gmail.com',
  }
  return res.json({ data: { post, author, comments } })
}

const getListPost = async (req: Request, res: Response, next: NextFunction) => {
  const { page, size } = req.query
  const pagination: IPagination = {
    page: parseInt(page as string) || 1,
    size: parseInt(size as string) || 10,
  }
  const offset = (pagination.page - 1) * pagination.size

  try {
    const posts = await Post.find().sort({ likes: 'desc' }).skip(offset).limit(pagination.size)
    const total = await Post.find().countDocuments()
    const totalPage = Math.ceil(total / pagination.size)
    pagination.total = total
    pagination.total_page = totalPage

    const data: any = []
    // TODO: Use real data
    const author = {
      nickname: 'Trịnh Mai Huy',
      email: 'trinh.mai.huy@gmail.com',
    }
    posts.forEach((post) => {
      data.push({
        post,
        author,
      })
    })

    return res.json({ data, meta: pagination })
  } catch (error) {
    res.status(500).json(error)
  }
}

const commentPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const post = await Post.find({ _id: id })
    if (post) {
      const { content } = req.body
      // TODO: using validation instead
      if (!content) {
        return res.sendStatus(400)
      }
      const comment: IComment = {
        author_id: new Types.ObjectId('636125870f506d29b2baf95b'),
        post_id: new Types.ObjectId(id),
        content,
      }
      const newComment = await Comment.create(comment)
      const data = {
        ...newComment.toJSON(),
        author: 'Đỗ Tiến Đạt',
      }
      return res.json({ data })
    }
    return res.sendStatus(404)
  } catch (error) {
    res.status(500).json(error)
  }
}

export { createPost, getPost, getListPost, commentPost }
