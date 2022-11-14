import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'

export interface IPagination {
  page: number
  size: number
  total?: number
  total_page?: number
}

export type MongooseID = string | Types.ObjectId

export type UserInfo = {
  _id: MongooseID
  role: string
  nickname: string
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

// TODO: Remove dummy data
const userId = '6367d1362d289b4017d4f82a'
export { userId }
