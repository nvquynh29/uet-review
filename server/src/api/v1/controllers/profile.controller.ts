import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'

const getProfile = async (req: Request, res: Response) => {
  const { _id } = res.locals.user
  const user = <IUser>await User.findOne({ _id })

  const { email, nickname, role, is_banned, banned_to } = user

  return res.json({ data: { _id, email, nickname, role, is_banned, banned_to } })
}

export { getProfile }
