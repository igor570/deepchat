import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import router from './routes/router'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { createUser, loginUser } from './handlers/user'
import { generatePrompt } from './utils/generatePrompt'
import { GoogleGenAI } from '@google/genai'

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

/* TODO
/*
Next step: We need to design the DB so we know how this is gonna work
- A user or AI can create a Message

After this:
  [Websocket opens]
  - It should open a web socket connection

  [sendMessage function]
  - The user can send a message via the web socket
  - This message should be passed into the AIPrompt function
  - This should return an ai AIPrompt
  - This should be sent back via the websocket
*/

/**
 * Socket
 */
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('User has left')
  })

  socket.on('chat-message', async (msg) => {
    try {
      const geminiResponse = await generatePrompt(msg)
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
