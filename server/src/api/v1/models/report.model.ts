import mongoose, { Schema, Types } from 'mongoose'
import { ReportStatus } from '../types'

export interface IReport {
  reporter: object
  post?: object
  slug?: string
  reason?: string
  status_id?: ReportStatus
}

const reportSchema = new Schema<IReport>(
  {
    reporter: { type: Types.ObjectId, required: true, ref: 'User' },
    post: { type: Types.ObjectId, required: false, ref: 'Post' },
    reason: { type: String },
    status_id: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

const Report = mongoose.model<IReport>('Report', reportSchema)
export default Report
