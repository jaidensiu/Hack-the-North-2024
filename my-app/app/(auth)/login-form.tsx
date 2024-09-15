import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LoginForm from "@/components/auth/LoginForm";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserContext } from "../contexts/userContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission
  // const [userID, setUserID] = useState<string | null>(null);
  const router = useRouter();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }

  const { userID, setUserID } = context;

  // Trigger query only after submission
  const userQuery = useQuery(api.tasks.getUser, {
    email: email,
    enabled: isSubmitted,
  });

  useEffect(() => {
    if (userQuery) {
      setUserID(userQuery?._id); // Set the retrieved user ID after query resolves
      console.log("Retrieved user:", userQuery);
    }
  }, [userQuery]);

  const handleLogin = (email: string) => {
    console.log("Logging in with email:", email);
    setEmail(email);
    setIsSubmitted(true); // Trigger the query by marking the form as submitted
  };

  useEffect(() => {
    if (userID) {
      console.log(userID);
      router.replace("/(tabs)"); // Navigate to the next screen once the user ID is set
    }
  }, [userID]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm onLogin={handleLogin} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
