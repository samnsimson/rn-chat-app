import { Session, User } from '@supabase/supabase-js'

export type Message = {
    id: string
    title: string
    message: string
    img: string | undefined
    read: boolean
}

export type FormKeys = 'firstName' | 'lastName' | 'email' | 'password'

export type RegisterFormType = { [key in FormKeys]: string }

export type LoginFormType = Pick<RegisterFormType, 'email' | 'password'>

export type UserContext = {
    user: Session | null
    isLoading: boolean
    signIn: (email: string, password: string) => Promise<Session | null>
    signUp: (email: string, password: string) => Promise<Session | null>
    signOut: () => Promise<null>
    listUsers: () => Promise<User[]>
}
