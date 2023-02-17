import { Box, HStack, IconButton, Input, Pressable } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

export const InputBox = () => {
    return (
        <Box padding={3} _light={{ background: "white" }}>
            <HStack space={3}>
                <IconButton
                    icon={<Icon name="folder-sharp" size={20} color="#fff" />}
                    borderRadius="full"
                    color="light.50"
                    variant={"solid"}
                />
                <Input
                    variant="rounded"
                    size="md"
                    flex={1}
                    InputRightElement={
                        <Pressable onPress={() => null} className="mr-2">
                            {({ isPressed }) => (
                                <Icon name="send-sharp" size={20} color={isPressed ? "blue" : "#333"} />
                            )}
                        </Pressable>
                    }
                />
                <IconButton
                    icon={<Icon name="camera-sharp" size={20} color="#fff" />}
                    variant="solid"
                    borderRadius="full"
                />
            </HStack>
        </Box>
    );
};
