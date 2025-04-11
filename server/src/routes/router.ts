import { Router, Request, Response } from 'express'

const router = Router()

/**
 * Messages routes
 */
router.post('/get-messages', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get messages stub' })
})

router.post('/send-message', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Send message stub' })
})

router.get('/get-ai-reply', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get AI reply stub' })
})

export default router
