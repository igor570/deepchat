import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import router from './routes/router'
import jwt from 'jsonwebtoken'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

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

    const token = socket.handshake.auth.token

    let userId: string

    //Verify the token sent by user on connection

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET ?? '')

        if (typeof payload !== 'string' && 'userId' in payload) {
            userId = payload.userId
        } else {
            throw new Error('Invalid token payload')
        }

        console.log(`User connected: ${userId}`)
    } catch (err) {
        console.log('Authentication failed:', err)
        socket.emit('error', { message: 'Authentication error' })
        socket.disconnect()
        return
    }

    //Disconnect the user if they close connection

    socket.on('disconnect', () => {
        console.log('User has left')
    })

    //Allow the user to send chat messages to AI

    socket.on('chat-message', async (msg) => {
        try {
            await addMessage({
                userId,
                content: msg,
                senderType: 'user',
            })

            const geminiResponse = await generatePrompt(msg)

            await addMessage({
                userId,
                content: msg,
                senderType: 'ai',
            })

            socket.emit('reply', geminiResponse)
        } catch (error) {
            socket.emit('error', {
                message: 'Failed to generate an AI response',
            })
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
