import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="login-form" options={{ title: 'Login' }} />
      <Stack.Screen name="signup-form" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}