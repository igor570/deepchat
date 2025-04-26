import jwt from 'jsonwebtoken'
import { addMessage } from '../dataAccessors/addMessage'
import { aiUUID } from '../utils/consts'
import { generatePrompt } from '../utils/generatePrompt'
import { ExtendedError } from 'socket.io/dist/namespace'
import { CustomSocket } from '../types/customSocket'
import { Socket } from 'socket.io'

//JWT Verification Socket Middleware
export const authenticateSocket = (
    socket: Socket,
    next: (err?: ExtendedError) => void
) => {
    const token = socket.handshake.auth.token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET ?? '')

        //TODO: Fix this auth to receive userId correctly so the auth middlware works

        // if (typeof payload !== 'string' && 'userId' in payload) {
        //     socket.userId = payload.userId
        //     console.log(`User connected: ${socket.userId}`)
        //     next()
        // } else {
        //     throw new Error('Invalid token payload')
        // }
    } catch (err) {
        console.log('Authentication failed:', err)
        next(new Error('Authentication error'))
    }
}

// chatHandler.ts
export const handleChatMessage = (socket: Socket) => {
    return async (message: { userId: string; message: string }) => {
        try {
            const userId = message.userId
            const msg = message.message

            //Add user message to DB
            await addMessage({
                userId,
                content: msg,
                senderType: 'user',
            })
            const geminiResponse = await generatePrompt(msg)

            //Add AI message to DB - we take the users id as well to identify which user the AI talked to
            await addMessage({
                userId: aiUUID,
                content: geminiResponse,
                senderType: 'ai',
                userTalkedTo: userId,
            })

            socket.emit('reply', { content: geminiResponse, senderType: 'ai' })

            //Error catch
        } catch (error: any) {
            socket.emit('error', {
                message: 'Failed to generate an AI response',
                error: error.message,
            })
        }
    }
}
