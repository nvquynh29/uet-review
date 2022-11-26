import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import Post, { IPost, IReview } from '../models/post.model'
import { generateSlug } from '../../../pkg/slugify'
import {
  Author,
  ICommentResp,
  IPagination,
  MongooseID,
  Reaction,
  ReactionTypes,
  userId,
  UserInfo,
} from '../types'
import Comment, { IComment } from '../models/comment.model'
import { getCommentReactionType, getPostReactionType } from '../services/reaction.service'
import { jwtHelper } from '../helpers/jwt.helper'

const createPost = async (req: Request, res: Response) => {
  const body = req.body
  const subjectId = body.subject != '' ? new Types.ObjectId(body.subject) : undefined
  const lecturerId = body.lecturer != '' ? new Types.ObjectId(body.lecturer) : undefined
  const { _id } = res.locals.user
  const post: IPost = {
    author_id: _id,
    subject_id: subjectId,
    lecturer_id: lecturerId,
    title: body.title,
    content: body.content,
    reviews: new Types.DocumentArray<IReview>([]),
    tags: [],
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
  // TODO: Implement guest middleware
  const post = await Post.findOne({ slug })
    .populate({
      path: 'author_id',
      select: {
        _id: 1,
        nickname: 1,
        email: 1,
      },
    })
    .exec()
  if (post == null) {
    return res.sendStatus(404)
  }

  // TODO: Using middleware
  let currentUserId: MongooseID = userId
  const accessToken = <string>(req.headers['X-ACCESS-TOKEN'] || req.headers['x-access-token'])
  try {
    const { _id } = <UserInfo>jwtHelper.extractTokenInfo(accessToken)
    currentUserId = _id
  } catch (error) {
    currentUserId = userId
  }
  const reaction = await getPostReactionType(currentUserId, slug)
  const comments = await Comment.find({ post_id: post._id })

  const commentResp: ICommentResp[] = []
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i]
    let reaction: Reaction = {
      type: ReactionTypes.NONE,
    }
    if (currentUserId != userId) {
      const reactionType = await getCommentReactionType(currentUserId, comment._id)
      reaction = {
        type: reactionType,
      }
    }

    commentResp.push(<ICommentResp>{
      ...comment.toJSON(),
      type: reaction.type,
    })
  }

  let author = <Author>{
    nickname: 'Trịnh Mai Huy',
    email: 'trinh.mai.huy@gmail.com',
  }
  if (post.author_id != null) {
    author = post.author_id as Author
  }

  return res.json({ data: { post, author, comments: commentResp, reaction } })
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
      _id: userId,
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
    const { _id, nickname } = res.locals.user
    const post = await Post.find({ _id: id })
    if (post) {
      const { content } = req.body
      // TODO: using validation instead
      if (!content) {
        return res.sendStatus(400)
      }
      const comment: IComment = {
        author_id: new Types.ObjectId(_id),
        post_id: new Types.ObjectId(id),
        content,
      }
      const newComment = await Comment.create(comment)
      const data = {
        ...newComment.toJSON(),
        author: nickname,
      }
      return res.json({ data })
    }
    return res.sendStatus(404)
  } catch (error) {
    res.status(500).json(error)
  }
}

export { createPost, getPost, getListPost, commentPost }
