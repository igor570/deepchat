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

export interface MappedMessage {
    id: string
    userId: string
    content: string
    senderType: Message['sender_type']
    userTalkedTo: string
    createdAt: string
}

export interface SocketMessage {
    userId: string
    content: string
    senderType?: Message['sender_type']
}
