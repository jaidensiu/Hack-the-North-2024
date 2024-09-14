import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = (email: string) => {
    console.log("Login with email:", email);
    // HI KIM
    router.replace("/(tabs)/studentHome");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm onLogin={handleLogin} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
