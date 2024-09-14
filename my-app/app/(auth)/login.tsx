import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import SuberTuderIcon from '@/assets/images/home_icon.jpg';

export default function AuthLandingScreen() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/(auth)/login-form');
  };

  const navigateToSignUp = () => {
    router.push('/(auth)/signup-form');
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={SuberTuderIcon} style={styles.icon} />
      <ThemedText style={styles.title}>Welcome to SuberTuder</ThemedText>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>
        <View style={styles.buttonSpacing} />
        <TouchableOpacity style={styles.button} onPress={navigateToSignUp}>
          <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
        </TouchableOpacity>
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
  icon: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#44ba5d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSpacing: {
    height: 10,
  },
});