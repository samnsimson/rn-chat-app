import { SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider, StatusBar } from 'native-base'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { AuthProvider } from './src/hooks'
import { Main } from './main'

const App = () => {
    return (
        <ActionSheetProvider>
            <NativeBaseProvider>
                <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <StatusBar barStyle="dark-content" />
                        <AuthProvider>
                            <Main />
                        </AuthProvider>
                    </SafeAreaView>
                </SafeAreaProvider>
            </NativeBaseProvider>
        </ActionSheetProvider>
    )
}

export default App
