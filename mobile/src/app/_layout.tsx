import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../lib/tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Stack />
    </TamaguiProvider>
  );
}
