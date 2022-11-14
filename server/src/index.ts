import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { reactPost, reactComment } from './api/v1/services/reaction.service'
import { ReactionTypes, userId, UserInfo } from './api/v1/types'
import httpServer from './server'
import { jwtHelper } from './api/v1/helpers/jwt.helper'

dotenv.config()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
})

io.on('connection', (socket) => {
  console.log('Connect...')
  socket.on('react-post', async (data) => {
    const accessToken = socket.handshake.auth.token
    const { _id } = <UserInfo>jwtHelper.extractTokenInfo(accessToken as string)
    const { code, slug } = data
    const res = await reactPost(_id as string, slug, code)

    io.emit('post-reacted', res)
  })

  socket.on('comment-post', (data) => {
    socket.broadcast.emit('new-post-comment', data)
  })

  socket.on('react-comment', async (data) => {
    console.log(data)
    const { _id, code } = data
    const res = await reactComment(userId, _id, code)
    io.emit('comment-reacted', res)
  })
})
