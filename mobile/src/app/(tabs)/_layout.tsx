import { Tabs } from "expo-router";
import { Goal, CircleCheckBig, SettingsIcon } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "hsl(222, 47%, 20%)",
        tabBarInactiveTintColor: "hsl(215, 16%, 47%)",
      }}
    >
      <Tabs.Screen
        name="targets"
        options={{
          title: "Targets",
          tabBarLabel: "Targets",
          tabBarIcon: ({ color, size }) => (
            <Goal color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="completions"
        options={{
          title: "Completions",
          tabBarLabel: "Completions",
          tabBarIcon: ({ color, size }) => (
            <CircleCheckBig color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
