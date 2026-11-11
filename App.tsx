import { Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PulsSurface from './src/components/PulsSurface';

export default function App() {
  const native = Platform.OS !== 'web';
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView edges={native ? ['top'] : []} style={styles.safe}>
        <SafeAreaView edges={native ? ['bottom'] : []} style={styles.body}>
          <PulsSurface native={native} dom={{ scrollEnabled: false, style: { flex: 1 } }} />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#072d67' },
  body: { flex: 1, backgroundColor: '#fff' },
});
