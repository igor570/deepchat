import db from '../db'

export const getAllMessages = async ({ userId }: { userId: string }) => {
    try {
        const query = await db.query(
            `SELECT * FROM messages WHERE user_id = $1 AND user_talked_to = $1`,
            [userId]
        )

        return query.rows

        //Error
    } catch (error: any) {
        console.error('Database error details:', error)
        throw new Error(`Error adding message to DB: ${error.message}`)
    }
}
