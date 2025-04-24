import { useEffect, useRef } from 'react'
import { MappedMessage } from '../../lib/types/message'

interface ChatConversationProps {
    messages: MappedMessage[]
}

export const ChatConversation = ({ messages }: ChatConversationProps) => {
    const conversationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Auto-scroll to the bottom (which is actually the top in column-reverse)
        if (conversationRef.current) {
            conversationRef.current.scrollTop = 0
        }
    }, [messages])

    return (
        <div className="chat__conversation">
            {messages.map((message) =>
                message.senderType === 'user' ? (
                    <div className="chat__message-user">{message.content}</div>
                ) : (
                    <div className="chat__message-ai">{message.content}</div>
                )
            )}
        </div>
    )
}
