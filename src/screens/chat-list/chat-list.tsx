import { FlatList } from 'react-native'
import { gravatar } from '../../utils'
import { ChatListItem, ChatListSeperator } from '../../components'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import { useAuth, useContacts } from '../../hooks'
import { Button } from 'native-base'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

type Props = NativeStackScreenProps<RootStackParamList, 'ChatList'>

export const ChatList = (props: Props) => {
    const { tempContactList } = useContacts()
    const [users, setUsers] = useState<User[]>([])
    const { isLoading, signOut, listUsers } = useAuth()

    const ContactData = tempContactList.map((contact) => ({
        id: String(contact.id),
        title: String(contact.title),
        message: `Message from ${contact.message}`,
        img: gravatar(String(contact.img)),
        read: true,
    }))

    useEffect(() => {
        listUsers()
            .then((users) => console.log(users))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <FlatList
                data={ContactData}
                renderItem={({ item }) => <ChatListItem {...item} />}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={() => <ChatListSeperator hasAvatar />}
                className="bg-white"
            />
            <Button onPress={() => signOut()} isLoadingText="Please wait..." isLoading={isLoading}>
                Signout
            </Button>
        </>
    )
}
