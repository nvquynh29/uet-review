import { Request, Response } from 'express'
import mongoose from 'mongoose'
import User, { IUser } from '../models/user.model'


const createUser = async (req: Request, res: Response) => {
  const body = req.body
  const data: IUser = {
    nickname: body.nickname,
    email: body.email,
    password: body.password,
    role_id: new mongoose.Types.ObjectId(),
  }
  const user = await User.create(data)
  return res.json({ user })
}

export {
  createUser,
}
