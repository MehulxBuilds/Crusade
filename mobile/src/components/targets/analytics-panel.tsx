import { Text, XStack, YStack } from "tamagui";

type Analytics = {
  total: number;
  completed: number;
  aborted: number;
  missed: number;
};

export function AnalyticsPanel({ analytics }: { analytics: Analytics }) {
  return (
    <XStack gap="10" flexWrap="wrap">
      <MetricCard label="Completed" value={analytics.completed} />
      <MetricCard label="Aborted" value={analytics.aborted} />
      <MetricCard label="Missed" value={analytics.missed} />
    </XStack>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <YStack
      flex={1}
      minWidth={0}
      minHeight={96}
      justifyContent="center"
      alignItems="center"
      borderRadius="$8"
      padding="$3.5"
      gap="$2"
      backgroundColor="rgba(255,255,255,0.18)"
      borderWidth={1}
      borderColor="rgba(255,255,255,0.32)"
    >
      <Text color="rgba(255,255,255,0.72)" fontSize={12} fontWeight="800" numberOfLines={1}>
        {label}
      </Text>

      <Text color="#ffffff" fontSize={28} fontWeight="900">
        {value}
      </Text>
    </YStack>
  );
}

