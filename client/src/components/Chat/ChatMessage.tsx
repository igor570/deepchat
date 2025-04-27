import { useAppStore } from '../../lib/store/useAppStore'
import { SocketMessage } from '../../lib/types/message'

export const ChatMessage = ({ messages }: { messages: SocketMessage[] }) => {
    const awaitingReply = useAppStore((s) => s.awaitingReply)

    return (
        <>
            {messages?.map((message, index) =>
                message.senderType === 'user' ? (
                    <div key={index} className="chat__message-user">
                        {message.content}
                    </div>
                ) : (
                    <div key={index} className="chat__message-ai">
                        {message.content}
                    </div>
                )
            )}
            {awaitingReply && (
                <div className="chat__message-ai chat__message-loading">
                    AI is typing...
                </div>
            )}
        </>
    )
}
