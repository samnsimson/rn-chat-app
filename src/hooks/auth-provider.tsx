import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, Session } from '@supabase/supabase-js'
import { createContext, useContext, useState } from 'react'
import { env } from '../config'
import { UserContext } from '../types'
import { setupURLPolyfill } from 'react-native-url-polyfill'
import { Platform } from 'react-native'

if (Platform.OS !== 'web') {
    setupURLPolyfill()
}

const { PROJECT_URL, SUPABASE_API_KEY } = env

const useAuthProvider = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<Session | null>(null)

    const supabase = createClient(PROJECT_URL, SUPABASE_API_KEY, {
        auth: {
            storage: AsyncStorage as any,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    })

    const signIn = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            const { session } = data
            return session
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            const { data, error } = await supabase.auth.signUp({ email, password })
            if (error) throw error
            const { session } = data
            return session
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const signOut = async () => {
        try {
            setIsLoading(true)
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            return null
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const listUsers = async () => {
        try {
            setIsLoading(true)
            const { data, error } = await supabase.from('users').select('*')
            if (error) throw error
            return data
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    supabase.auth.onAuthStateChange((event, session) => {
        switch (event) {
            case 'SIGNED_IN':
                setUser(session)
                break
            case 'SIGNED_OUT':
                setUser(null)
            default:
                break
        }
    })

    return { user, isLoading, listUsers, signIn, signUp, signOut }
}

const AuthContext = createContext<UserContext>({} as UserContext)

export const AuthProvider = ({ children }: any) => {
    const auth = useAuthProvider()
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
