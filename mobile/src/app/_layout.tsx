import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";

import { useDrizzleMigrations } from "@/db";
import tamaguiConfig from "../lib/tamagui.config";

export default function RootLayout() {
  const { success, error } = useDrizzleMigrations();

  if (error) {
    throw error;
  }

  if (!success) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Stack />
    </TamaguiProvider>
  );
}
