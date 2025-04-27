import { useEffect, useRef } from 'react'
import { MappedMessage, SocketMessage } from '../../lib/types/message'
import { ChatMessage } from './ChatMessage'
import { ChatHistoricalMessage } from './ChatHistoricalMessage'

interface ChatConversationProps {
    historicalMessages?: MappedMessage[]
    messages?: SocketMessage[]
}

export const ChatConversation = ({
    historicalMessages,
    messages,
}: ChatConversationProps) => {
    const conversationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = 0
        }
    }, [historicalMessages, messages])

    return (
        <div className="chat__conversation">
            <ChatHistoricalMessage
                historicalMessages={historicalMessages || []}
            />
            <ChatMessage messages={messages || []} />
        </div>
    )
}
