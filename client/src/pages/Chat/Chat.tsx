import { useEffect, useState } from 'react'
import { ChatConversation, ChatHeader, ChatSendMessage } from '../../components'
import { useGetMessages } from '../../lib/hooks/getAllMessages'
import { useAppStore } from '../../lib/store/useAppStore'
import { socket } from '../../socket'
import { MappedMessage } from '../../lib/types/message'
import './Chat.scss'

export const Chat = () => {
    const userId = useAppStore((s) => s.userId)
    const { data, isLoading, isError } = useGetMessages(userId)

    const [isConnected, setIsConnected] = useState(socket.connected)
    const [messages, setMessages] = useState<MappedMessage | []>([])

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
            console.warn('Socket disconnected')
        }

        function onFooEvent(value) {
            setFooEvents((previous) => [...previous, value])
        }

        function onConnectError(error) {
            console.error('Socket connection error:', error)
        }

        // Set initial connection state
        setIsConnected(socket.connected)

        // Register socket events
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('foo', onFooEvent)
        socket.on('connect_error', onConnectError)

        // Cleanup socket events on unmount
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('foo', onFooEvent)
            socket.off('connect_error', onConnectError)
        }
    }, [])

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
                <ChatConversation historicalMessages={data} />
                <ChatSendMessage />
            </div>
        </div>
    )
}
