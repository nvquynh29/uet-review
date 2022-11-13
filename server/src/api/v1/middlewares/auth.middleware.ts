import { NextFunction, Request, Response } from 'express'
import { TokenExpiredError } from 'jsonwebtoken'
import { jwtHelper } from '../helpers/jwt.helper'

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenFromClient = <string>req.headers['x-access-token'] || req.headers['X-ACCESS-TOKEN']
  if (tokenFromClient) {
    try {
      // decoded contains user's information
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient as string,
        process.env.ACCESS_TOKEN_SECRET as string,
        {}
      )
      res.locals.user = decoded
      next()
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        if (error.message === 'jwt expired') {
          res.locals.message = error.message
          const decoded = await jwtHelper.verifyToken(
            tokenFromClient as string,
            process.env.ACCESS_TOKEN_SECRET as string,
            { ignoreExpiration: true }
          )
          res.locals.user = decoded
          return next()
        }
      }

      return res.status(500).json({ error })
    }
  } else {
    return res.status(403).json({ msg: 'forbidden' })
  }
}

export default isAuth
