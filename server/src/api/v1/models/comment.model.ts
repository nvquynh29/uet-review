import mongoose, { Schema, Types } from 'mongoose'

interface IComment {
  author_id: object
  post_id: object
  content: string
  created_at: Date
  updated_at: Date
}

const commentSchema = new Schema<IComment>(
  {
    author_id: { type: Types.ObjectId, required: true, ref: 'User' },
    post_id: { type: Types.ObjectId, required: true, ref: 'Post' },
    content: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

const Comment = mongoose.model<IComment>('Comment', commentSchema)
export default Comment
