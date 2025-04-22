import { create } from 'zustand'

interface AppStore {
    userId: string
    setUserId: (userId: string) => void
}

export const useAppStore = create<AppStore>((set) => ({
    userId: '',
    setUserId: (userId: string) => set({ userId }),
}))
