import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import router from './routes/router'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { createUser, loginUser } from './handlers/user'
import { GoogleGenAI } from '@google/genai'
import { authenticateSocket, handleChatMessage } from './handlers/socket'
import { CustomSocket } from './types/customSocket'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
const server = createServer(app)
export const io = new Server(server)
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY })

/**** Middleware ****/

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**** Authenticate Socket - Global middleware for all socket listeners ****/

// io.use((socket, next) => authenticateSocket(socket as CustomSocket, next))

/**** Main Socket ****/

io.on('connection', async (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('User has left')
    })

    socket.on('chat-message', handleChatMessage(socket as CustomSocket))
})

/**** Router ****/

app.use('/api', router)

/**** Auth Endpoints ****/

app.post('/signup', createUser)
app.post('/signin', loginUser)

/**** Server Launch ****/

server.listen(PORT, () => console.log(`Server running on ${PORT}`))
