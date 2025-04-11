import db from '../db'
import { Message } from '../types/message'

export const addMessage = async ({ userId, content, senderType }: Message) => {
    try {
        await db.query(
            `INSERT INTO messages (user_id, content, sender_type) VALUES ($1, $2, $3)`,
            [userId, content, senderType]
        )

        //Error
    } catch (error: any) {
        console.error('Database error details:', error)
        throw new Error(`Error adding message to DB: ${error.message}`)
    }
}
