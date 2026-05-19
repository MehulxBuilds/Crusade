import { Tabs } from "expo-router";
import { Goal, SettingsIcon, House } from "lucide-react-native";
import { StyleSheet, useWindowDimensions, View } from "react-native";
 
export default function TabLayout() {
  const { width } = useWindowDimensions();
  const tabBarWidth = width * 0.5;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f8fafc",
        tabBarInactiveTintColor: "rgba(248, 250, 252, 0.45)",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 999,
          marginHorizontal: 4,
          marginVertical: 7,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 56,
          height: 56,
          width: tabBarWidth,
          transform: [{ translateX: tabBarWidth / 2 }],
          borderTopWidth: 0,
          borderRadius: 999,
          backgroundColor: "rgb(36, 37, 41)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.12)",
          paddingHorizontal: 8,
          paddingVertical: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.28,
          shadowRadius: 18,
          elevation: 16,
        },
        tabBarBackground: () => <View style={styles.glassSurface} />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
        }}
      />
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

const styles = StyleSheet.create({
  glassSurface: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
});
