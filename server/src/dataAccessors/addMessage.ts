import db from '../db'
import { Message } from '../types/message'

/*
TODO: Make a function that takes the user's message from the socket 
      and inserts it into the messages table
*/

export const addMessage = async ({ userId, content, senderType }: Message) => {
    if (!userId || content || senderType) return

    try {
        await db.query(
            `INSERT INTO messages (user_id, content, sender_type) VALUES ($1, $2, $3)`,
            [userId, content, senderType],
        )

        console.log('Added message to DB')
    } catch (error) {
        throw new Error('Error adding message to DB')
    }
}
