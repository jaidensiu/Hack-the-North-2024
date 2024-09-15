import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SooperTooderIcon from '@/assets/images/splash.png';

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
      <Image source={SooperTooderIcon} style={styles.icon} />
      <ThemedText style={styles.title}>Welcome to Sooper Tooder</ThemedText>
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
    padding: 32,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#0081FB',
    padding: 16,
    marginHorizontal: 64,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSpacing: {
    height: 16,
  },
});