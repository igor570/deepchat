import { Router, Request, Response } from 'express'
import { getAllMessages } from '../dataAccessors/getAllMessages'

const router = Router()

/**
 * Messages routes
 */
router.get('/get-messages', async (req: Request, res: Response) => {
    try {
        const { userId } = req.query

        if (!userId) {
            res.status(400).json({
                error: 'Missing userId in query parameters',
            })
        }

        const response = await getAllMessages({ userId: userId as string })

        res.status(200).json(response)
    } catch (error: any) {
        console.error('Database error details:', error)
        res.status(500).json({
            error: `Error finding messages: ${error.message}`,
        })
    }
})

export default router
