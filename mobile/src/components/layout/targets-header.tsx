import { router } from "expo-router";
import { Target as TargetIcon, User } from "lucide-react-native";
import { Button, Text, XStack, YStack } from "tamagui";

import { primaryColor } from "@/components/targets/constants";

export function TargetsHeader() {
  return (
    <YStack gap="$3" paddingTop="$3">
      <YStack
        borderRadius="$8"
        padding="$4"
        gap="$3"
        overflow="hidden"
        backgroundColor={primaryColor}
        borderWidth={1}
        borderColor="rgba(255,255,255,0.34)"
      >
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap="$3">
            <YStack
              width={46}
              height={46}
              alignItems="center"
              justifyContent="center"
              borderRadius="$10"
              backgroundColor="rgba(255,255,255,0.22)"
            >
              <TargetIcon color="#ffffff" size={24} />
            </YStack>
            <YStack>
              <Text color="rgba(255,255,255,0.72)" fontSize={13}>
                Sorted by date
              </Text>
              <Text color="#ffffff" fontSize={26} fontWeight="900">
                Targets
              </Text>
            </YStack>
          </XStack>

          <Button
            circular
            size="$4"
            chromeless
            backgroundColor="rgba(255,255,255,0.18)"
            borderColor="rgba(255,255,255,0.22)"
            borderWidth={1}
            onPress={() => router.push("/settings")}
            icon={<User color="#ffffff" size={22} />}
          />
        </XStack>

        <Text color="rgba(255,255,255,0.72)" fontSize={14}>
          Search, review, and update every target from one place.
        </Text>
      </YStack>
    </YStack>
  );
}

