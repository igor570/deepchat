import { create } from 'zustand'
import { SocketMessage } from '../types/message'
import { socket } from '../../socket'

interface AppStore {
    userId: string
    setUserId: (userId: string) => void
    isConnected: boolean
    setIsConnected: (isConnected: boolean) => void
    messages: SocketMessage[] | []
    setMessages: (messages: SocketMessage[]) => void
}

export const useAppStore = create<AppStore>((set) => ({
    userId: '',
    setUserId: (userId: string) => set({ userId }),
    isConnected: socket.connected,
    setIsConnected: (isConnected: boolean) => set({ isConnected }),
    messages: [],
    setMessages: (messages: SocketMessage[]) => set({ messages }),
}))
