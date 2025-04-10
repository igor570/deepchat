export interface Message {
  userId: string
  content: string
  senderType: 'user' | 'ai'
  createdAt: Date
}
