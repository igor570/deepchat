import { useEffect, useRef } from 'react'
import { Message } from '../../lib/types/message'

interface ChatConversationProps {
    messages: Message[]
}

export const ChatConversation = ({ messages }: ChatConversationProps) => {
    const conversationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = 0
        }
    }, [messages])

    return (
        <div className="chat__conversation">
            {messages.map((message) =>
                message.senderType === 'user' ? (
                    <div className="chat__message-ai">{message.message}</div>
                ) : (
                    <div className="chat__message-user">{message.message}</div>
                )
            )}
        </div>
    )
}
