import { NextFunction, Request, Response } from 'express'

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals
    if (user.role?.toLowerCase() === 'admin') {
      next()
    } else {
      return res.status(403).json({ message: 'forbidden' })
    }
  } catch (err) {
    return res.status(500).json({ message: 'server error' })
  }
}

export default isAdmin
