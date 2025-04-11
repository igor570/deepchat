import jwt from 'jsonwebtoken'
import { addMessage } from '../dataAccessors/addMessage'
import { aiUUID } from '../utils/consts'
import { generatePrompt } from '../utils/generatePrompt'
import { ExtendedError } from 'socket.io/dist/namespace'
import { CustomSocket } from '../types/customSocket'

//JWT Verification Socket Middleware
export const authenticateSocket = (
    socket: CustomSocket,
    next: (err?: ExtendedError) => void
) => {
    const token = socket.handshake.auth.token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET ?? '')
        if (typeof payload !== 'string' && 'userId' in payload) {
            socket.userId = payload.userId
            console.log(`User connected: ${socket.userId}`)
            next()
        } else {
            throw new Error('Invalid token payload')
        }
    } catch (err) {
        console.log('Authentication failed:', err)
        next(new Error('Authentication error'))
    }
}

// chatHandler.ts
export const handleChatMessage = (socket: CustomSocket) => {
    return async (msg: string) => {
        try {
            const userId = socket.userId

            //Add user message to DB
            await addMessage({
                userId,
                content: msg,
                senderType: 'user',
            })
            const geminiResponse = await generatePrompt(msg)

            //Add AI message to DB
            await addMessage({
                userId: aiUUID,
                content: geminiResponse,
                senderType: 'ai',
            })
            socket.emit('reply', geminiResponse)

            //Error catch
        } catch (error: any) {
            socket.emit('error', {
                message: 'Failed to generate an AI response',
                error: error.message,
            })
        }
    }
}
