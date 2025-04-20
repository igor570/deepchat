export interface Message {
    userId?: string
    message: string
    senderType: 'user' | 'ai'
}
