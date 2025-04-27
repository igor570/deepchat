import { useShallow } from 'zustand/shallow'
import { useAppStore } from '../../lib/store/useAppStore'

export const ChatMessage = () => {
    const [awaitingReply, messages] = useAppStore(
        useShallow((s) => [s.awaitingReply, s.messages])
    )

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
