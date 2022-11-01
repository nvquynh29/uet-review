import mongoose, { Schema, Types } from 'mongoose'

export interface IUser {
  nickname: string
  email: string
  password: string
  role_id: object
  is_banned?: boolean
  banned_to?: Date
}

const userSchema = new Schema<IUser>({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role_id: { type: Types.ObjectId, required: true, ref: 'Role' },
  is_banned: { type: Boolean, required: true, default: false },
  banned_to: { type: Date, required: false },
})

const User = mongoose.model<IUser>('User', userSchema)
export default User
