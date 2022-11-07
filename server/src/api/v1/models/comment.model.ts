import mongoose, { Schema, Types } from 'mongoose'

export interface IComment {
  author_id: object
  post_id: object
  content: string
  likes?: number
  dislikes?: number
  created_at?: Date
  updated_at?: Date
}

const commentSchema = new Schema<IComment>(
  {
    author_id: { type: Types.ObjectId, required: true, ref: 'User' },
    post_id: { type: Types.ObjectId, required: true, ref: 'Post' },
    content: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

const Comment = mongoose.model<IComment>('Comment', commentSchema)
export default Comment
