import React, { useState , useEffect, useContext} from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserContext } from '../contexts/userContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);  // State to track form submission
  // const [userID, setUserID] = useState<string | null>(null);
  const router = useRouter();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserProfile must be used within a UserProvider');
  }

  const { userID, setUserID } = context;

  // Trigger query only after submission
  const userQuery = useQuery(api.tasks.getUser, { email: email ,enabled: isSubmitted });

  useEffect(() => {
    if (userQuery) {
      setUserID(userQuery?._id);  // Set the retrieved user ID after query resolves
      console.log("Retrieved user:", userQuery);
    }
  }, [userQuery]);

  const handleLogin = () => {
    setIsSubmitted(true);  // Trigger the query by marking the form as submitted
  };

  useEffect(() => {
    if (userID) {
      console.log(userID)
      router.replace('/(tabs)');  // Navigate to the next screen once the user ID is set
    }
  }, [userID]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Login</ThemedText>
          <View style={styles.placeholderIcon} />
        </View>

        <View style={styles.form}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholderIcon: {
    width: 24,
    height: 24,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});