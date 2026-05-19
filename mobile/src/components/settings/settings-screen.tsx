import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreenView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.description}>App Settings Comming Soon</Text>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#172554',
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
  },
});
