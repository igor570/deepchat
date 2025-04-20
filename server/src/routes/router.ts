import { Router, Request, Response } from 'express'
import { getAllMessages } from '../dataAccessors/getAllMessages'

const router = Router()

/**
 * Messages routes
 */
router.post('/get-messages', async (req: Request, res: Response) => {
    try {
        const { userId } = req.body

        if (!userId)
            res.status(400).json({ error: 'Missing userId in request body' })

        const response = await getAllMessages({ userId })

        res.status(200).json(response)
    } catch (error: any) {
        console.error('Database error details:', error)
        res.status(500).json({
            error: `Error finding messages: ${error.message}`,
        })
    }
})

export default router
