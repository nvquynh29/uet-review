import mongoose, { Schema, Types } from 'mongoose'

interface IReport {
  user_id: object
  reporter_id: object
  post_id: object
  title: string
  reason: string
  status_id: ReportStatus
  created_at: Date
  updated_at: Date
}

enum ReportStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

const reportSchema = new Schema<IReport>(
  {
    user_id: { type: Types.ObjectId, required: true, ref: 'User' },
    reporter_id: { type: Types.ObjectId, required: true, ref: 'User' },
    post_id: { type: Types.ObjectId, required: true, ref: 'Post' },
    title: { type: String, required: true },
    reason: { type: String, required: true },
    status_id: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

const Report = mongoose.model<IReport>('Report', reportSchema)
export default Report
