import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
import { useGetMessages } from '../../lib/hooks/getAllMessages'
import { useAppStore } from '../../lib/store/useAppStore'
import './Chat.scss'

export const Chat = () => {
    const userId = useAppStore((s) => s.userId)

    const { data } = useGetMessages(userId)

    if (!data) throw new Error('No messages retrieved')

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
