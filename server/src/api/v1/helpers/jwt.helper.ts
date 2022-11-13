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

export const jwtHelper = {
  generateToken,
  verifyToken,
}
