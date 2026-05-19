import { CalendarDays } from "lucide-react-native";
import { Text, XStack, YStack } from "tamagui";

import { Target } from "@/types";
import { formatDate, getStatusColor } from "@/components/utils";
import { View } from "react-native";

export function TargetCard({ target, onPress }: { target: Target; onPress: () => void }) {
  const statusColor = getStatusColor(target.status);
  const daysUntilTarget = Math.ceil((new Date(target.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <YStack
      onPress={onPress}
      borderRadius="$6"
      padding="$4"
      gap="$3"
      backgroundColor="#ffffff"
      borderWidth={1}
      borderColor="#e2e8f0"
      shadowColor="#616161"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.1}
      shadowRadius={2}
      elevation={1}
      pressStyle={{ backgroundColor: "#f4f4f4", scale: 0.99 }}
    >
      <XStack justifyContent="space-between" gap="$3" alignItems="flex-start">
        <YStack flex={1} gap="$1">
          <Text color="#0f172a" fontSize={17} fontWeight="700" numberOfLines={1} ellipsizeMode="tail">
            {target.name}
          </Text>
          {target.description ? (
            <Text color="#64748b" fontSize={13} numberOfLines={1} ellipsizeMode="tail">
              {target.description}
            </Text>
          ) : null}
        </YStack>

        <YStack
          borderRadius="$10"
          paddingHorizontal="$3"
          paddingVertical="$1.5"
          backgroundColor={statusColor.background}
        >
          <Text color={statusColor.foreground} fontSize={11} fontWeight="800">
            {target.status}
          </Text>
        </YStack>
      </XStack>

      <XStack alignItems="center" justifyContent="space-between" gap="$2">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <CalendarDays size={15} color="#94a3b8" />
          <Text color="#64748b" fontSize={13}>
            {formatDate(target.targetDate)}
          </Text>
        </View>

        {target.status === "NEW" && (
          daysUntilTarget >= 0 ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text color="#64748b" fontSize={13}>
                Arrives In {Math.max(0, daysUntilTarget)} days
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text color="#64748b" fontSize={13}>
                Passed {Math.abs(daysUntilTarget)} days
              </Text>
            </View>
          ))}
      </XStack>
    </YStack>
  );
};
