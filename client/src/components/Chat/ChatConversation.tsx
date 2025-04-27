import { useEffect, useRef } from 'react'
import { MappedMessage } from '../../lib/types/message'
import { ChatMessage } from './ChatMessage'
import { ChatHistoricalMessage } from './ChatHistoricalMessage'

interface ChatConversationProps {
    historicalMessages?: MappedMessage[]
}

export const ChatConversation = ({
    historicalMessages,
}: ChatConversationProps) => {
    const conversationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = 0
        }
    }, [historicalMessages])

    return (
        <div className="chat__conversation">
            <ChatHistoricalMessage
                historicalMessages={historicalMessages || []}
            />
            <ChatMessage />
        </div>
    )
}
