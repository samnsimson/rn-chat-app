import { useActionSheet } from "@expo/react-native-action-sheet";
import { Avatar, Box, HStack, Pressable, Text } from "native-base";
import { gravatar } from "../../utils";

type Props = {
    messages: string[];
};

export const MessageBox = ({ messages }: Props) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const options = ["Reply", "Forward", "Save", "Download", "Delete", "Cancel"];
    const destructiveButtonIndex = options.indexOf("Delete");
    const cancelButtonIndex = options.indexOf("Cancel");
    const actionSheetOption = { options, cancelButtonIndex, destructiveButtonIndex };

    const showActionSheet = () => {
        showActionSheetWithOptions(actionSheetOption, (selectedIndex: number | undefined) => {
            switch (selectedIndex) {
                case 1:
                    break;
                case destructiveButtonIndex:
                    break;
                case cancelButtonIndex:
                    break;
            }
        });
    };

    return (
        <Box padding={2}>
            {messages.map((message, key) => (
                <HStack key={key} alignItems="flex-end" space={2}>
                    <Avatar source={{ uri: gravatar("sannsimson@gmail.com") }} size="sm" />
                    <Pressable
                        px="3"
                        py="2"
                        my="0.5"
                        borderRadius="xl"
                        borderBottomLeftRadius={0}
                        className="bg-slate-600"
                        maxWidth="3/4"
                        onLongPress={() => showActionSheet()}
                    >
                        <Text fontSize="md" color="light.100">
                            {message}
                        </Text>
                    </Pressable>
                </HStack>
            ))}
        </Box>
    );
};
