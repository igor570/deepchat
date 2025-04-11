import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import router from './routes/router'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

import { createUser, loginUser } from './handlers/user'
import { generatePrompt } from './utils/generatePrompt'
import { GoogleGenAI } from '@google/genai'
import { addMessage } from './dataAccessors/addMessage'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
const server = createServer(app)
export const io = new Server(server)
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY })

/**
 * Middleware
 */
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * Main Socket
 */
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('User has left')
  })

  socket.on('chat-message', async (msg) => {
    try {
      //Do i need to receive the userId via the socket?
      await addMessage({
        userId: 'da53e1c6-972e-4f61-9fc0-7c6008daed17',
        content: msg,
        senderType: 'user',
      })

      const geminiResponse = await generatePrompt(msg)

      await addMessage({
        userId: 'da53e1c6-972e-4f61-9fc0-7c6008daed17',
        content: msg,
        senderType: 'ai',
      })

      socket.emit('reply', geminiResponse)
    } catch (error) {
      socket.emit('error', { message: 'Failed to generate an AI response' })
    }
  })
})

/**
 * Router
 */
app.use('/api', router)

/**
 * Auth Endpoints
 */
app.post('/signup', createUser)
app.post('/signin', loginUser)

/**
 * Launch Server
 */
server.listen(PORT, () => console.log(`Server running on ${PORT}`))
