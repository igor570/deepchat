import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
import { chatData } from '../../lib/constants/chatDataTest'
import './Chat.scss'

export const Chat = () => {
    return (
        <div className="chat__page">
            <ChatHeader />
            <ChatConversation messages={chatData} />
            <ChatSendMessage />
        </div>
    )
}
