import jwt from 'jsonwebtoken'
// import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import { jwtHelper } from '../helpers/jwt.helper'
import User, { IUser } from '../models/user.model'
import { Request, Response, CookieOptions } from 'express'
import { MongooseID, Role } from '../types/index'

const updateRefreshToken = (id: MongooseID, refreshToken: string) => {
  User.findByIdAndUpdate(id, { refreshToken }, { new: true }, (err, _) => {
    if (err) {
      console.error(err)
    }
  })
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credential' })
    }
    const userInfo = { _id: user._id, role: user.role, nickname: user.nickname }

    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (passwordMatch) {
      const accessToken = await jwtHelper.generateToken(
        userInfo,
        process.env.ACCESS_TOKEN_SECRET as string,
        '1h'
      )
      const refreshToken = await jwtHelper.generateToken(
        userInfo,
        process.env.REFRESH_TOKEN_SECRET as string,
        '30d'
      )
      updateRefreshToken(user._id, refreshToken as string)
      return res.status(200).json({ accessToken, refreshToken, role: user.role, _id: user._id, nickname: user.nickname })
    }
    return res.status(401).json({ error: 'Invalid credential' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

const signup = async (req: Request, res: Response) => {
  // convert string to number
  const salt = +(process.env.SALT as string)
  try {
    const { nickname, email, password } = req.body
    // validate input
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() })
    // }
    const validInput = email && password && nickname
    if (!validInput) {
      res.status(400).send('All input is required')
    }

    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login')
    }

    const hashedPassword = await bcrypt.hash(password, salt)

    const user: IUser = {
      nickname,
      email,
      password: hashedPassword,
      role: Role.USER,
    }

    await User.create(user)
    return res.status(200).json({ message: 'Account created' })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const refreshToken = async (req: Request, res: Response) => {
  const refreshTokenFromClient = req.headers['x-refresh-token'] || req.body.refreshToken
  if (!refreshTokenFromClient) {
    return res.status(403).json({ message: 'No token provided' })
  }
  const user = await User.findOne({ refreshToken: refreshTokenFromClient })
  if (!user) {
    return res.status(403).json({ message: 'Invalid refresh token' })
  }
  try {
    jwt.verify(refreshTokenFromClient, process.env.REFRESH_TOKEN_SECRET as string)
    const accessToken = await jwtHelper.generateToken(
      { _id: user._id, role: user.role, nickname: user.nickname },
      process.env.ACCESS_TOKEN_SECRET as string,
      '1h'
    )
    return res.status(200).json({ accessToken })
  } catch (error) {
    console.error(error)
    return res.status(403).json({ message: 'Invalid refresh token' })
  }
}

const logout = async (req: Request, res: Response) => {
  const { _id } = res.locals.user
  try {
    await User.findByIdAndUpdate({ _id }, { refreshToken: undefined })
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export { login, signup, logout, refreshToken }
