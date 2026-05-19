import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { TargetsHeader } from "@/components/layout/targets-header";
import { TargetFormDialog } from "@/components/targets/target-form-dialog";
import { TargetListSection } from "@/components/targets/target-list-section";
import { TargetSearchBar } from "@/components/targets/target-search-bar";
import { useTargetDashboard } from "@/hooks/use-target-dashboard";

export function TargetsDashboard() {
  const insets = useSafeAreaInsets();
  const dashboard = useTargetDashboard();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top", "left", "right"]}>
      <YStack flex={1} backgroundColor="#f8fafc">
        <YStack flex={1} padding="$5" paddingTop={Math.max(insets.top ? 12 : 20, 12)} gap="$5">
          <TargetsHeader />
          <TargetSearchBar
            value={dashboard.query}
            onChange={dashboard.setQuery}
            onAdd={dashboard.openCreateDialog}
          />
          <TargetListSection
            title="All targets"
            targets={dashboard.sortedTargets}
            bottomPadding={Math.max(insets.bottom + 132, 156)}
            onAdd={dashboard.openCreateDialog}
            onEdit={dashboard.openEditDialog}
            onRefresh={dashboard.refreshTargets}
            refreshing={dashboard.refreshing}
          />
        </YStack>

        <TargetFormDialog
          form={dashboard.form}
          open={dashboard.open}
          mode={dashboard.isEditing ? "edit" : "create"}
          onDelete={dashboard.onDelete}
          onOpenChange={dashboard.setOpen}
          onSubmit={dashboard.onSubmit}
        />
      </YStack>
    </SafeAreaView>
  );
}
