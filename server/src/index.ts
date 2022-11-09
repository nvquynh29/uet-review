import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { reactPost, reactComment } from './api/v1/services/reaction.service'
import { ReactionTypes, userId } from './api/v1/types'
import httpServer from './server'

dotenv.config()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
})

io.on('connection', (socket) => {
  console.log('Connect...')
  socket.on('react-post', async (data) => {
    const { code, slug } = data
    const res = await reactPost(userId, slug, code)

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
