import { View } from "react-native";
import React from "react";

type ChatListSeperatorProps = {
    hasAvatar: boolean;
};

export const ChatListSeperator = ({ hasAvatar = false }: Partial<ChatListSeperatorProps>) => {
    return <View className={`h-[0.5] bg-slate-400/50 w-full ${hasAvatar && "ml-20"}`} />;
};
