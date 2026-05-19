import { Plus } from "lucide-react-native";
import { Button, Text, XStack, YStack } from "tamagui";

import { buttonColor } from "@/components/targets/constants";

export function EmptyTargets({ onAdd }: { onAdd: () => void }) {
  return (
    <YStack alignItems="center" gap="$3" borderRadius="$7" padding="$6" marginTop={30}>
      <Text color="#9c9c9c" fontSize={16} fontWeight="700" letterSpacing={-0.4}>
        No targets yet
      </Text>
      <Button
        height={48}
        borderRadius="$size.5.5"
        backgroundColor={buttonColor}
        borderColor="rgba(255,255,255,0.2)"
        borderWidth={1}
        onPress={onAdd}
      >
        <XStack alignItems="center" gap="$2">
          <Plus color="#ffffff" size={18} />
          <Text color="#ffffff" fontWeight="800" letterSpacing={-0.4}>
            Add Target
          </Text>
        </XStack>
      </Button>
    </YStack>
  );
}

