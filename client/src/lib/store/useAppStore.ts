import { create } from 'zustand'
import { SocketMessage } from '../types/message'
import { socket } from '../../socket'

interface AppStore {
    userId: string
    isConnected: boolean
    messages: SocketMessage[] | []
    awaitingReply: boolean
    setUserId: (userId: string) => void
    setIsConnected: (isConnected: boolean) => void
    setMessages: (messages: SocketMessage[]) => void
    setAwaitingReply: (awaitingReply: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
    userId: '',
    isConnected: socket.connected,
    messages: [],
    awaitingReply: false,
    setUserId: (userId: string) => set({ userId }),
    setIsConnected: (isConnected: boolean) => set({ isConnected }),
    setMessages: (messages: SocketMessage[]) => set({ messages }),
    setAwaitingReply: (awaitingReply: boolean) => set({ awaitingReply }),
}))
