import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useState } from 'react'
import { Button, Center, Checkbox, Divider, FormControl, HStack, Input, KeyboardAvoidingView, Pressable, Stack, Text } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { LoginFormType, RootStackParamList } from '../../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Alert, WelcomeMessageComp } from '../../components'
import { useAuth } from '../../hooks'

const initialFormData: LoginFormType = {
    email: '',
    password: '',
}

export const LoginScreen = () => {
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<LoginFormType>(initialFormData)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { isLoading, signIn } = useAuth()

    const handleChange = (key: string, value: string) => {
        setFormData((state) => ({ ...state, [key]: value }))
    }

    const handleLogin = () => {
        const { email, password } = formData
        signIn(email, password)
            .then(() => navigation.replace('ChatList'))
            .catch((err) => setError(err.message))
            .finally(() => setFormData(initialFormData))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView flex={1} backgroundColor="light.100" justifyContent={'center'} behavior="padding">
                <Center>
                    <FormControl isRequired>
                        <Stack mx="4" space={3}>
                            <WelcomeMessageComp page="login" />
                            <Input
                                type="text"
                                placeholder="Email"
                                size={'2xl'}
                                variant="rounded"
                                backgroundColor={'light.200'}
                                keyboardType="email-address"
                                letterSpacing={3}
                                padding={4}
                                value={formData.email}
                                onChangeText={(text) => handleChange('email', text)}
                                InputRightElement={
                                    <Pressable padding={3}>
                                        <Icon name="mail" size={20} color={'#a8a29e'} />
                                    </Pressable>
                                }
                            />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                size={'2xl'}
                                variant="rounded"
                                backgroundColor={'light.200'}
                                keyboardType="default"
                                letterSpacing={3}
                                padding={4}
                                value={formData.password}
                                onChangeText={(text) => handleChange('password', text)}
                                InputRightElement={
                                    <Pressable padding={3} onPress={() => setShowPassword(!showPassword)}>
                                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={'#a8a29e'} />
                                    </Pressable>
                                }
                            />
                            <HStack justifyContent={'space-between'} alignItems={'center'} px={2}>
                                <Checkbox value="REMEMBER_CREDENTIALS">
                                    <Text fontSize={12}>Remember me</Text>
                                </Checkbox>
                                <Button variant={'link'} size={'sm'}>
                                    Forgot password?
                                </Button>
                            </HStack>
                            <Button
                                size={'lg'}
                                padding={4}
                                rounded="full"
                                backgroundColor={'darkBlue.800'}
                                onPress={handleLogin}
                                isLoading={isLoading}
                                isLoadingText="Please wait..."
                            >
                                Login
                            </Button>
                            <Center>
                                <Divider my={4} w="50%" />
                            </Center>
                            <Button
                                size={'lg'}
                                padding={4}
                                rounded="full"
                                colorScheme={'primary'}
                                backgroundColor={'primary.600'}
                                onPress={() => navigation.navigate('Register')}
                            >
                                Signup
                            </Button>
                        </Stack>
                    </FormControl>
                </Center>
                {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
