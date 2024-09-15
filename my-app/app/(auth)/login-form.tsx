import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "@/components/auth/LoginForm";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserContext } from "../contexts/userContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission
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
    if (userQuery !== undefined) {
      if (userQuery === null) {
        // No user found, redirect to sign-up
        router.replace("/(auth)/signup-form");
      } else {
        setUserID(userQuery._id);
        console.log("Retrieved user:", userQuery);
      }
    }
  }, [userQuery]);

  const handleLogin = (email: string) => {
    setEmail(email);
    setIsSubmitted(true); // Trigger the query by marking the form as submitted
  };

  useEffect(() => {
    if (userID) {
      console.log(userID);
      router.replace("/(tabs)"); // Navigate to the next screen once the user ID is set
    }
  }, [userID]);
  // Get user id, if not available in table, go to sign up form right away
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm onLogin={handleLogin} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
