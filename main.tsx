import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { useAuth } from './src/hooks'
import { ChatList, ChatWindow, LoginScreen, RegisterScreen } from './src/screens'
import { RootStackParamList } from './src/types'

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

type ScreenOptionKeys = 'loginScreen' | 'registerScreen' | 'chatList'
type ScreenOptions = { [key in ScreenOptionKeys]: NativeStackNavigationOptions }

/* Setting the options for the screens. */
const screenOptions: ScreenOptions = {
    loginScreen: {
        headerShown: false,
        gestureDirection: 'vertical',
        animationTypeForReplace: 'push',
        gestureEnabled: false,
    },
    registerScreen: {
        headerShown: false,
        gestureDirection: 'vertical',
        animationTypeForReplace: 'push',
        gestureEnabled: false,
    },
    chatList: {
        title: 'Chats',
    },
}

export const Main = () => {
    const { user } = useAuth()
    return (
        <NavigationContainer>
            <Navigator initialRouteName={user ? 'ChatList' : 'Login'}>
                {!user ? (
                    <>
                        <Screen name="Login" component={LoginScreen} options={screenOptions.loginScreen} />
                        <Screen name="Register" component={RegisterScreen} options={screenOptions.registerScreen} />
                    </>
                ) : (
                    <>
                        <Screen name="ChatList" component={ChatList} options={screenOptions.chatList} />
                        <Screen name="ChatWindow" component={ChatWindow} />
                    </>
                )}
            </Navigator>
        </NavigationContainer>
    )
}
