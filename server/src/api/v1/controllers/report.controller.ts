import { Request, Response } from 'express'
import Post from '../models/post.model'
import Report, { IReport } from '../models/report.model'
import { IPagination, ReportStatus } from '../types'

const reportPost = async (req: Request, res: Response) => {
  let { post_id, slug, reason, detail } = req.body

  // TODO: Using validator before this layer
  if (detail && (detail as string).length > 500) {
    return res.status(400).json({ message: 'Nội dung quá dài, số ký tự tối đa là 500' })
  }
  const { _id } = res.locals.user

  if (slug) {
    const post = await Post.findOne({ slug })
    if (post) {
      post_id = post.id
    } else {
      return res.status(400).json({ msg: 'Invalid slug' })
    }
  }

  const report = <IReport>{
    reporter: _id,
    post: post_id,
    slug,
    reason,
    detail,
  }
  report.status_id = ReportStatus.PENDING

  const newReport = await Report.create(report)
  return res.json({ data: newReport })
}

const getListReport = async (req: Request, res: Response) => {
  const { page, size } = req.query
  const pagination: IPagination = {
    page: parseInt(page as string) || 1,
    size: parseInt(size as string) || 10,
  }
  const offset = (pagination.page - 1) * pagination.size

  try {
    const reports = await Report.find()
      .populate({
        path: 'reporter',
        select: { _id: 1, nickname: 1, email: 1 },
      })
      .populate({
        path: 'post',
        select: { _id: 1, title: 1, slug: 1 },
      })
      .sort({ created_at: 'desc' })
      .skip(offset)
      .limit(pagination.size)
    const total = await Report.find().countDocuments()
    const totalPage = Math.ceil(total / pagination.size)
    pagination.total = total
    pagination.total_page = totalPage

    return res.json({ data: reports, meta: pagination })
  } catch (error) {
    res.status(500).json(error)
  }
}

export { reportPost, getListReport }
