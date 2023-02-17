import { gravatar } from '../utils'

export const useContacts = () => {
    // const [contactList, setContactList] = useState<Partial<Contact>[]>([])

    const tempContactList = [
        {
            id: 'String(contact.id)1',
            title: 'String(contact.name)',
            message: `Message from ${'contact.name'}`,
            img: gravatar(String('contact.name')),
            read: true,
        },
        {
            id: 'String(contact.id)2',
            title: 'String(contact.name)',
            message: `Message from ${'contact.name'}`,
            img: gravatar(String('contact.name')),
            read: true,
        },
        {
            id: 'String(contact.id)3',
            title: 'String(contact.name)',
            message: `Message from ${'contact.name'}`,
            img: gravatar(String('contact.name')),
            read: true,
        },
    ]

    // useEffect(() => {
    //     ;(async () => {
    //         const { status } = await requestPermissionsAsync()
    //         if (status === 'granted') {
    //             const { data } = await getContactsAsync({
    //                 fields: [Fields.PhoneNumbers, Fields.FirstName, Fields.LastName],
    //                 sort: SortTypes.FirstName,
    //             })
    //             setContactList(data)
    //         }
    //     })()
    // }, [])

    return { tempContactList }
}
