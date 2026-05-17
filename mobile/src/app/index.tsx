import { Text, View, StyleSheet } from "react-native";
import { Button } from 'tamagui'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>

      <Button style={styles.button}>
        <Text style={styles.text}>
          Lorem ipsum
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  }
});
