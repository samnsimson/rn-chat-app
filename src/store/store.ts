import { create } from 'zustand'
import { combine, createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session, User } from '@supabase/supabase-js'

type InitialState = {
    user: User | null
    session: Session | null
}

const initialState: InitialState = {
    user: null,
    session: null,
}

export const useUserStore = create(
    persist(
        combine(initialState, (set) => ({
            setUser: (user: User | null) => set((state) => ({ ...state, user })),
            setSession: (session: Session | null) => set((state) => ({ ...state, session })),
        })),
        { name: 'user-store', storage: createJSONStorage(() => AsyncStorage) }
    )
)
