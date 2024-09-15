import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RadioButton, TouchableRipple } from "react-native-paper";
import SignupForm from "@/components/auth/SignupForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserContext } from "../contexts/userContext";

export default function SignupFormScreen() {
  const router = useRouter();

  const handleSignup = (data: {
    name: string;
    phoneNumber: string;
    email: string;
    age: string;
    gender: string;
    userType: "student" | "tutor";
  }) => {
    // TODO: HI KIM

    // Navigate to the appropriate home screen based on user type
    if (data.userType === "student") {
      router.replace({
        pathname: "/(tabs)/studentHome",
        params: { user: JSON.stringify(data) }, // TODO: Fix user interface
      });
    } else {
      router.replace({
        pathname: "/(tabs)/tutorHome",
        params: { user: JSON.stringify(data) },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupForm onSignup={handleSignup} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
