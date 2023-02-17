import { Box, Center, Heading, Text } from 'native-base'

interface Props {
    page: 'login' | 'register'
}

export const WelcomeMessageComp = ({ page }: Props) => {
    return (
        <Box mb={4}>
            <Center>
                <Heading color={'blueGray.600'} mb={2}>
                    Welcome to your chat app
                </Heading>
                <Text color={'light.400'} fontSize={16} textAlign="center">
                    {page === 'login'
                        ? 'Login with your phone number and password to continue chatting'
                        : 'Register with your phone number and password and start chatting'}
                </Text>
            </Center>
        </Box>
    )
}
