import { MappedMessage } from '../../lib/types/message'

export const ChatHistoricalMessage = ({
    historicalMessages,
}: {
    historicalMessages: MappedMessage[]
}) => {
    return (
        <>
            {historicalMessages?.map((message) =>
                message.senderType === 'user' ? (
                    <div className="chat__message-user">{message.content}</div>
                ) : (
                    <div className="chat__message-ai">{message.content}</div>
                )
            )}
        </>
    )
}
