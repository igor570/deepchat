export interface Message {
    user_id: string
    content: string
    sender_type: 'ai' | 'user'
}

export interface getAllMessagesPromise extends Message {
    id: string
    user_talked_to?: string
    created_at: string
}
