import { router } from "expo-router";
import { Target as TargetIcon, User } from "lucide-react-native";
import { Button, Text, View, XStack, YStack } from "tamagui";

import { AnalyticsPanel } from "@/components/targets/analytics-panel";
import { primaryColor } from "@/components/targets/constants";

type Analytics = {
  total: number;
  completed: number;
  aborted: number;
  missed: number;
};

export function HomeHeader({ analytics }: { analytics: Analytics }) {
  return (
    <YStack gap="$3" paddingTop="$3">
      <YStack
        borderRadius="$8"
        padding="$4"
        gap="12"
        overflow="hidden"
        backgroundColor={primaryColor}
        borderWidth={1}
        borderColor="rgba(255,255,255,0.34)"
      >
        <XStack alignItems="center" justifyContent="space-between" paddingVertical="2" marginBottom="12">
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
                Good Day!
              </Text>
              <Text color="#ffffff" fontSize={18} fontWeight="800">
                Crusade
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

        <View gap="$1">
          <Text color="rgba(255,255,255,0.72)" fontSize={14} fontWeight="600">
            Total Targets
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Text color="#ffffff" fontSize={100} lineHeight={120} fontWeight="900">
              {analytics.total}
            </Text>
            <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
              <Text color="rgba(255,255,255,0.72)" fontSize={26} fontWeight="bold" letterSpacing={-1.2}>
                Stay on target
              </Text>
              <Text color="rgba(255,255,255,0.72)" fontSize={13} fontWeight="600" letterSpacing={-0.2}>
                Consistency & momentum is all u need.
              </Text>
            </View>
          </View>
        </View>

        <AnalyticsPanel analytics={analytics} />
      </YStack>
    </YStack>
  );
}

