import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AboutTheApp from './screens/aboutTheApp/AboutTheApp';

export default function App() {
  return (
    <View style={styles.container}>
      <AboutTheApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
