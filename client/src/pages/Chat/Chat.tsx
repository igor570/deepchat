import { useCallback, useEffect, useState } from 'react'
import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
import { useGetMessages } from '../../lib/hooks/getAllMessages'
import { useAppStore } from '../../lib/store/useAppStore'
import { socket } from '../../socket'
import { SocketMessage } from '../../lib/types/message'
import './Chat.scss'

export const Chat = () => {
    const userId = useAppStore((s) => s.userId)
    const { data, isLoading, isError } = useGetMessages(userId)
    const [, setIsConnected] = useState(socket.connected)
    const [messages, setMessages] = useState<SocketMessage[] | []>([])

    const handleSendMessage = useCallback(
        (message: string) => {
            if (!userId) {
                console.error('User ID is missing. Cannot send message.')
                return
            }
            socket.emit('chat-message', { userId, message })

            setMessages((prevMessages) => [
                ...prevMessages,
                { userId, content: message, senderType: 'user' },
            ])
        },
        [userId]
    )

    useEffect(() => {
        socket.connect()
    }, [])

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
            console.warn('Socket disconnected')
        }

        function onReceiveMessage(message: SocketMessage) {
            // Update the messages array with the new message from the server
            setMessages((prevMessages) => [...prevMessages, message])
        }

        function onConnectError(error: unknown) {
            console.error('Socket connection error:', error)
        }

        // Set initial connection state
        setIsConnected(socket.connected)

        // Register socket events
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('reply', onReceiveMessage)
        socket.on('connect_error', onConnectError)

        // Cleanup socket events on unmount
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('chat-message', handleSendMessage)
            socket.off('reply', onReceiveMessage)
            socket.off('connect_error', onConnectError)
        }
    }, [userId, handleSendMessage])

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
                <ChatConversation
                    historicalMessages={data}
                    messages={messages}
                />
                <ChatSendMessage onSubmit={handleSendMessage} />
            </div>
        </div>
    )
}
