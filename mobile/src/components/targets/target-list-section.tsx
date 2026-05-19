import { RefreshControl, ScrollView } from "react-native";
import { Text, XStack, YStack } from "tamagui";

import { Target } from "@/types";
import { EmptyTargets } from "@/components/targets/empty-targets";
import { TargetCard } from "@/components/targets/target-card";

export function TargetListSection({
  title,
  targets,
  bottomPadding,
  onAdd,
  onEdit,
  onRefresh,
  refreshing,
}: {
  title: string;
  targets: Target[];
  bottomPadding: number;
  onAdd: () => void;
  onEdit: (target: Target) => void;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  return (
    <YStack flex={1} minHeight={0} gap="$3">
      <XStack alignItems="center" justifyContent="space-between">
        <Text color="#636363" fontSize={20} fontWeight="700" letterSpacing={-0.3}>
          {title}
        </Text>
        <Text color="#64748b" fontSize={13}>
          {targets.length} shown
        </Text>
      </XStack>

      <ScrollView
        contentContainerStyle={{ gap: 12, paddingBottom: bottomPadding }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3a3a44"
            colors={["#2f2f36"]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {targets.length ? (
          targets.map((target) =>
            <TargetCard key={target.id} target={target} onPress={() => onEdit(target)}
            />)
        ) : (
          <EmptyTargets onAdd={onAdd} />
        )}
      </ScrollView>
    </YStack>
  );
};
