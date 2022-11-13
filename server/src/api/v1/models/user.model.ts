import mongoose, { Schema, Types } from 'mongoose'
import { Role } from '../types'

export interface IUser {
  nickname: string
  email: string
  password: string
  refreshToken?: string
  role: string
  is_banned?: boolean
  banned_to?: Date
}

const userSchema = new Schema<IUser>({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
  role: { type: String, required: true, default: Role.USER },
  is_banned: { type: Boolean, required: true, default: false },
  banned_to: { type: Date, required: false },
})

const User = mongoose.model<IUser>('User', userSchema)
export default User
