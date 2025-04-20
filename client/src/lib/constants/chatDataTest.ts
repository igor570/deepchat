import { Message } from '../types/message'

export const chatData: Message[] = [
    {
        userId: '123',
        message: 'Hello! How can I help you today?',
        senderType: 'ai',
    },
    {
        userId: '456',
        message: 'I need some assistance with my account.',
        senderType: 'user',
    },
    {
        userId: '123',
        message: 'Sure! Can you please provide more details?',
        senderType: 'ai',
    },
    {
        userId: '456',
        message: 'I forgot my password and need to reset it.',
        senderType: 'user',
    },
]
