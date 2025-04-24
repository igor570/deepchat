import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
import { useGetMessages } from '../../lib/hooks/getAllMessages'
import { useAppStore } from '../../lib/store/useAppStore'
import './Chat.scss'

export const Chat = () => {
    const userId = useAppStore((s) => s.userId)

    const { data, isLoading, isError } = useGetMessages(userId)

    if (!userId || isLoading) {
        return <div>Loading...</div> // Show a loading indicator
    }

    if (isError) {
        throw new Error(`Error getting messages from user: ${userId}`)
    }

    if (!data || data.length === 0) {
        throw new Error(`No messages were found.`)
    }

    return (
        <div className="chat">
            <div className="chat__page">
                <ChatHeader />
                <ChatConversation messages={data} />
                <ChatSendMessage />
            </div>
        </div>
    )
}
