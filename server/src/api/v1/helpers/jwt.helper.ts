import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserInfo } from '../types'

const generateToken = (user: UserInfo, secretSignature: string, tokenLife: string) =>
  new Promise((resolve, reject) => {
    const { _id, role } = user
    jwt.sign({ _id, role }, secretSignature, { expiresIn: tokenLife }, (error, token) => {
      if (error) {
        return reject(error)
      }
      resolve(token)
    })
  })

const verifyToken = (token: string, secretSignature: string, options: jwt.VerifyOptions) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secretSignature, options, (error, decoded) => {
      if (error) {
        return reject(error)
      }
      return resolve(decoded as JwtPayload)
    })
  })

// TODO: handle JsonWebTokenError: jwt must be provided, expires
const extractTokenInfo = (token: string, options?: jwt.VerifyOptions) => {
  const secretSignature = process.env.ACCESS_TOKEN_SECRET
  try {
    const data = jwt.verify(token, secretSignature as string, options)
    return data as UserInfo
  } catch (error) {
    console.log(error)
    // throw error
  }
}

export const jwtHelper = {
  generateToken,
  verifyToken,
  extractTokenInfo,
}
