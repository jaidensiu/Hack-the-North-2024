import React, { useState, useContext} from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import SignupForm from "@/components/auth/SignupForm";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserContext } from '../contexts/userContext';



export default function SignupFormScreen() {
  const router = useRouter();
  const context = useContext(UserContext);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('18');
  const [gender, setGender] = useState('Male');
  const [userType, setUserType] = useState<'student' | 'tutor'>('student');

  interface SignupData {
    name: string;
    phoneNumber: string;
    email: string;
    age: number;
    gender: string;
    userType: string;
  }


  if (!context) {
    throw new Error('UserProfile must be used within a UserProvider');
  }
  const { userID, setUserID } = context;
  const createUser = useMutation(api.tasks.createNewUser);


  const handleSignup = async ({ name, phoneNumber, email, age, gender, userType } : SignupData) => {
    console.log('Signup with:', name, phoneNumber, email, age, gender, userType);
    try {
      const result = await createUser({
        firstName: name,
        lastName: "user",
        email: email,
        phoneNumber: phoneNumber,
        type: userType,
        age: BigInt(age),
        topic: "temporary",
        sessionHistory: [],
        overallRating: BigInt(0),
      });
      setUserID(result);  // Save the result to the state
      console.log('User created:', result);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupForm onSignup={handleSignup} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
