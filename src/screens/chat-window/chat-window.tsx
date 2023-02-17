import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { InputBox, MessageBox } from "../../components";
import { KeyboardAvoidingView, ScrollView } from "native-base";
import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";

type Props = NativeStackScreenProps<RootStackParamList, "ChatWindow">;

const initialMessages = [
    "Hello World!",
    "",
    "This is a long string message from a person whom you know and love!",
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
];

export const ChatWindow = (props: Props) => {
    const { params } = useRoute<RouteProp<RootStackParamList>>();
    const [type, setType] = useState(CameraType.front);
    const [messages, setMessages] = useState(initialMessages);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        if (!permission || (permission && !permission.granted)) requestPermission();
    }, [permission]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={headerHeight} behavior="padding">
            <ScrollView style={{ flex: 1 }}>
                <MessageBox messages={messages} />
                {/* <View className="rounded-lg overflow-hidden w-[100px] m-3">
                    <Camera type={type} className="h-[160px] w-[100px]" />
                </View> */}
            </ScrollView>
            <InputBox />
        </KeyboardAvoidingView>
    );
};
