import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Message, RootStackParamList } from "../../types";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const ChatListItem = ({ title, message, img, read, id }: Message) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            className="p-2 d-flex flex-row items-center"
            onPress={() => navigation.navigate("ChatWindow", { id })}
        >
            <View className="h-14 w-14 mr-2 rounded-full overflow-hidden">
                <Image source={{ uri: img }} className="w-14 h-14" />
            </View>
            <View className="p-2 flex-1">
                <View className="d-flex flex-row items-center justify-between">
                    <View className="flex-1">
                        <Text className="mb-1 text-[16px] text-slate-600 font-semibold">{title}</Text>
                    </View>
                    <View className="w-auto">
                        <Text>3:35 PM</Text>
                    </View>
                </View>
                <Text className="text-sm text-gray-500">
                    <Icon
                        name={read ? "checkmark-done-sharp" : "checkmark-sharp"}
                        size={16}
                        color="#0ea5e9"
                        className="pr-2"
                    />
                    {message}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
