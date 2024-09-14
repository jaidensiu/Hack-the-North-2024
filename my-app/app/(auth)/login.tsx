import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Add login logic here
    router.replace('/(tabs)');
  };

  const handleSignUp = () => {
    // Add sign up logic here
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome to SuberTuder</ThemedText>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleLogin}
        />
        <View style={styles.buttonSpacing} />
        <Button
          title="Sign Up"
          onPress={handleSignUp}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  buttonSpacing: {
    height: 10,
  },
});