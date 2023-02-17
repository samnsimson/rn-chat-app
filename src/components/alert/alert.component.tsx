import { Alert as NativeAlert, HStack, IconButton, Text } from 'native-base'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    onClose: () => void
}

export const Alert = ({ type, message, onClose }: Props) => {
    const [showAlert, setShowAlert] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            showAlert && setShowAlert(false)
        }, 4000)

        return () => {
            clearTimeout(timer)
            onClose()
        }
    }, [showAlert])

    return showAlert ? (
        <NativeAlert w="100%" status={type} position="absolute" bottom={0} variant="top-accent">
            <HStack flexShrink={1} space={2} justifyContent="space-between" alignItems="center">
                <HStack space={2} flexShrink={1}>
                    <NativeAlert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                        {message}
                    </Text>
                </HStack>
                <IconButton
                    variant="unstyled"
                    _focus={{ borderWidth: 0 }}
                    icon={<Icon name="close" size={16} />}
                    onPress={() => setShowAlert(false)}
                />
            </HStack>
        </NativeAlert>
    ) : null
}
