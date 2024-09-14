import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import SignupForm from "@/components/auth/SignupForm";

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
    console.log("Signup with:", data);
    // HI KIM
    router.replace("/(tabs)/studentHome");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupForm onSignup={handleSignup} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
