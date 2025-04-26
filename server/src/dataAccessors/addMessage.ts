import db from '../db'
import { Message } from '../types/message'

export const addMessage = async ({
    userId,
    content,
    senderType,
    userTalkedTo,
}: Message) => {
    try {
        if (senderType === 'user')
            await db.query(
                `INSERT INTO messages (user_id, content, sender_type) VALUES ($1, $2, $3)`,
                [userId, content, senderType]
            )
        if (senderType === 'ai')
            await db.query(
                `INSERT INTO messages (user_id, content, sender_type, user_talked_to) VALUES ($1, $2, $3, $4)`,
                [userId, content, senderType, userTalkedTo]
            )

        //Error
    } catch (error: any) {
        console.error('Database error details:', error)
        throw new Error(`Error finding messages in DB: ${error.message}`)
    }
}
