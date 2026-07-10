import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppWatermark } from '@/components/layout/AppWatermark';

export default function AuthLayout() {
  return (
    <View style={styles.root}>
      <AppWatermark />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: 'transparent' },
        }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
});
