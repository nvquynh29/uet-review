import mongoose, { Schema, Types } from 'mongoose'
import { PostType } from '../types'

export interface IReview {
  _id: Types.ObjectId
  name: string
  content: string
}

export interface IPost {
  author_id: object
  subject_id?: object
  lecturer_id?: object
  title: string
  slug?: string
  content: string
  type?: PostType
  reviews: Types.DocumentArray<IReview>
  tags?: Array<string>
  likes?: number
  dislikes?: number
  created_at?: Date
  updated_at?: Date
}

const postSchema = new Schema<IPost>(
  {
    author_id: { type: Types.ObjectId, required: true, ref: 'User' },
    subject_id: { type: Types.ObjectId, ref: 'Subject' },
    lecturer_id: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: Number, required: true },
    content: { type: String, required: true },
    reviews: [{ name: String, content: String }],
    tags: [String],
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

const Post = mongoose.model<IPost>('Post', postSchema)
export default Post
