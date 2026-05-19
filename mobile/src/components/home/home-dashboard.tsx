import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { HomeHeader } from "@/components/layout/home-header";
import { TargetFormDialog } from "@/components/targets/target-form-dialog";
import { TargetListSection } from "@/components/targets/target-list-section";
import { TargetSearchBar } from "@/components/targets/target-search-bar";
import { useTargetDashboard } from "@/hooks/use-target-dashboard";

export function HomeDashboard() {
  const insets = useSafeAreaInsets();
  const dashboard = useTargetDashboard();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top", "left", "right"]}>
      <YStack flex={1} backgroundColor="#f8fafc">
        <YStack flex={1} padding="$5" paddingTop={Math.max(insets.top ? 12 : 20, 12)} gap="$5">
          <HomeHeader analytics={dashboard.analytics} />
          <TargetSearchBar
            value={dashboard.query}
            onChange={dashboard.setQuery}
            onAdd={dashboard.openCreateDialog}
          />
          <TargetListSection
            title="Your targets"
            targets={dashboard.sortedTargets.filter((v) => v.status === "NEW")}
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
