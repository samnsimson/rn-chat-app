import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { User } from '@supabase/supabase-js'
import { Button, Center, Divider, FormControl, Input, KeyboardAvoidingView, Pressable, ScrollView, Stack } from 'native-base'
import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { WelcomeMessageComp } from '../../components'
import { useAuth } from '../../hooks'
import { FormKeys, RegisterFormType, RootStackParamList } from '../../types'

const initialFormValue: RegisterFormType = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

export const RegisterScreen = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [formData, setFormData] = useState<RegisterFormType>(initialFormValue)
    const { isLoading, signUp } = useAuth()

    const handleChange = (key: FormKeys, text: string) => {
        setFormData((state) => ({ ...state, [key]: text }))
    }

    const isFormValid = (data: RegisterFormType) => {
        return Object.values(data).some((x) => x.length > 0)
    }

    const register = () => {
        if (!isFormValid(formData)) {
            setError('Form is invalid!')
            return
        }

        signUp(formData.email, formData.password)
            .then((user) => console.log(user))
            .catch((error) => setError(error.message))
            .finally(() => setFormData(initialFormValue))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
            <KeyboardAvoidingView flex={1} backgroundColor="light.100" justifyContent={'center'} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <FormControl isRequired>
                        <Stack mx="4" space={3}>
                            <WelcomeMessageComp page="register" />
                            <Input
                                type="text"
                                placeholder="First Name"
                                size={'2xl'}
                                variant="rounded"
                                backgroundColor={'light.200'}
                                keyboardType="default"
                                letterSpacing={3}
                                padding={4}
                                value={formData.firstName}
                                onChangeText={(text) => handleChange('firstName', text)}
                                InputRightElement={
                                    <Pressable padding={3}>
                                        <Icon name="person" size={20} color={'#a8a29e'} />
                                    </Pressable>
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Last Name"
                                size={'2xl'}
                                variant="rounded"
                                backgroundColor={'light.200'}
                                keyboardType="default"
                                letterSpacing={3}
                                padding={4}
                                value={formData.lastName}
                                onChangeText={(text) => handleChange('lastName', text)}
                                InputRightElement={
                                    <Pressable padding={3}>
                                        <Icon name="person" size={20} color={'#a8a29e'} />
                                    </Pressable>
                                }
                            />
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
                            <Button
                                size={'lg'}
                                padding={4}
                                rounded="full"
                                colorScheme={'primary'}
                                backgroundColor={'darkBlue.800'}
                                onPress={register}
                                isLoading={isLoading}
                                isLoadingText="Please wait..."
                            >
                                Signup
                            </Button>
                            <Center>
                                <Divider my={4} w="50%" />
                            </Center>
                            <Button
                                size={'lg'}
                                padding={4}
                                rounded="full"
                                backgroundColor={'primary.600'}
                                onPress={() => navigation.navigate('Login')}
                            >
                                Have an account?
                            </Button>
                        </Stack>
                    </FormControl>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
