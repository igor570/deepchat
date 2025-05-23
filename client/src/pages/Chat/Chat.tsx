import { useCallback, useEffect } from 'react'
import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
import { useGetMessages } from '../../lib/hooks/getAllMessages'
import { useAppStore } from '../../lib/store/useAppStore'
import { socket } from '../../socket'
import { SocketMessage } from '../../lib/types/message'
import { useShallow } from 'zustand/shallow'

import './Chat.scss'

export const Chat = () => {
    const [userId, messages, setMessages, setIsConnected, setAwaitingReply] =
        useAppStore(
            useShallow((s) => [
                s.userId,
                s.messages,
                s.setMessages,
                s.setIsConnected,
                s.setAwaitingReply,
            ])
        )
    const { data, isLoading, isError } = useGetMessages(userId)

    const handleSendMessage = useCallback(
        (message: string) => {
            if (!userId) {
                console.error('User ID is missing. Cannot send message.')
                return
            }
            socket.emit('chat-message', { userId, message })

            setMessages([
                ...messages,
                { content: message, userId, senderType: 'user' },
            ])

            setAwaitingReply(true)
        },
        [userId, setMessages, messages, setAwaitingReply]
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
            setMessages([
                ...messages,
                { content: message.content, senderType: 'ai' },
            ])

            setAwaitingReply(false)
        }

        function onConnectError(error: unknown) {
            console.error('Socket connection error:', error)
        }

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
    }, [
        userId,
        handleSendMessage,
        setIsConnected,
        setMessages,
        messages,
        setAwaitingReply,
    ])

    if (!userId || isLoading) {
        return <div>Loading...</div> // Show a loading indicator
    }

    if (isError) {
        throw new Error(`Error getting messages from user: ${userId}`)
    }

    return (
        <div className="chat">
            <div className="chat__page">
                <ChatHeader />
                <ChatConversation historicalMessages={data} />
                <ChatSendMessage onSubmit={handleSendMessage} />
            </div>
        </div>
    )
}
