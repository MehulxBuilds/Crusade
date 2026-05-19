import { Plus, Search } from "lucide-react-native";
import { Button, Input, XStack } from "tamagui";

import { buttonColor, mutedPlaceholder, primaryPressedColor } from "@/components/targets/constants";

export function TargetSearchBar({
  value,
  onChange,
  onAdd,
}: {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}) {
  return (
    <XStack gap="$3" alignItems="center">
      <XStack
        flex={1}
        alignItems="center"
        gap="$2"
        borderRadius="$10"
        paddingHorizontal="$4"
        backgroundColor="#ffffff"
        borderWidth={1}
        borderColor="#e2e8f0"
      >
        <Search size={18} color="#94a3b8" />
        <Input
          flex={1}
          borderWidth={0}
          paddingHorizontal={0}
          backgroundColor="transparent"
          color="#0f172a"
          placeholder="Search targets"
          placeholderTextColor={mutedPlaceholder}
          value={value}
          onChangeText={onChange}
        />
      </XStack>

      <Button
        circular
        size="$4.5"
        backgroundColor={buttonColor}
        pressStyle={{ backgroundColor: primaryPressedColor }}
        onPress={onAdd}
        icon={<Plus color="#ffffff" size={20} />}
      />
    </XStack>
  );
}

