import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
// import { chatData } from '../../lib/constants/chatDataTest'
import { useGetMessages } from '../../lib/hooks/getAllMessages'
import { useAppStore } from '../../lib/store/useAppStore'
import './Chat.scss'

export const Chat = () => {
    const userId = useAppStore((s) => s.userId)

    //TODO: Add mock db data and test if this hook works with provided userId
    const { data } = useGetMessages(userId)

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
