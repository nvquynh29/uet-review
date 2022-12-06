import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { IComment } from '../models/comment.model'

export interface IPagination {
  page: number
  size: number
  total?: number
  total_page?: number
}

// Types
export type Reaction = {
  type: ReactionTypes
}

export type ICommentResp = IComment & Reaction

export type MongooseID = string | Types.ObjectId

export type UserInfo = {
  _id: MongooseID
  role: string
  nickname: string
}

export type Author = {
  _id: MongooseID
  nickname: string
  email: string
}

// Enum
export enum ReactionTypes {
  NONE = -1,
  DISLIKE = 0,
  LIKE = 1,
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum ReportStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

export enum ReportType {
  NONE = -1,
  SUBJECT = 0,
  LECTURER = 1,
}

// TODO: Remove dummy data
const userId = '6367d1362d289b4017d4f82a'
export { userId }
