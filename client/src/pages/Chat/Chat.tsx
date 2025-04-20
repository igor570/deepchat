import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
import './Chat.scss'

export const Chat = () => {
    return (
        <div className="chat__page">
            <ChatHeader />
            <ChatConversation />
            <ChatSendMessage />
        </div>
    )
}
