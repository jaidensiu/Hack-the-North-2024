import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "@/components/auth/LoginForm";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserContext } from "../contexts/userContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }

  const { userID, setUserID, personType, setPersonType } = context;

  // Trigger query only after submission
  const userQuery = useQuery(api.tasks.getUser, {
    email: email,
    enabled: isSubmitted,
  });

  useEffect(() => {
    if (userQuery) {
      setUserID(userQuery?._id);

      console.log("Retrieved user:", userQuery);
    }
  }, [userQuery]);

  const handleLogin = (email: string) => {
    console.log("Logging in with email:", email);
    setEmail(email);

    setIsSubmitted(true);
  };

  useEffect(() => {
    setPersonType("student");
    if (userID) {
      console.log(userID);
      router.replace("/(tabs)/home");
    }
  }, [userID, personType]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm onLogin={handleLogin} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
