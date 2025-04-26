import { useEffect, useRef } from 'react'
import { MappedMessage, SocketMessage } from '../../lib/types/message'

interface ChatConversationProps {
    historicalMessages: MappedMessage[]
    messages?: SocketMessage[]
}

export const ChatConversation = ({
    historicalMessages,
    messages,
}: ChatConversationProps) => {
    const conversationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Auto-scroll to the bottom (which is actually the top in column-reverse)
        if (conversationRef.current) {
            conversationRef.current.scrollTop = 0
        }
    }, [historicalMessages])

    return (
        <div className="chat__conversation">
            {historicalMessages.map((message) =>
                message.senderType === 'user' ? (
                    <div className="chat__message-user">{message.content}</div>
                ) : (
                    <div className="chat__message-ai">{message.content}</div>
                )
            )}
            {messages?.map((message) =>
                message.senderType === 'user' ? (
                    <div className="chat__message-user">{message.content}</div>
                ) : (
                    <div className="chat__message-ai">{message.content}</div>
                )
            )}
        </div>
    )
}
