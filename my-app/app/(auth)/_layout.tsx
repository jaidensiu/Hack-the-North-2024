import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="login-form" options={{ title: 'Login' }} />
      <Stack.Screen name="signup-form" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}