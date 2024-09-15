import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import SignUpForm from "@/components/auth/SignupForm";

export default function SignupFormScreen() {
  const router = useRouter();

  const handleSignUp = (data: {
    firstName: string;
    lastName: string;
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
      <SignUpForm onSignUp={handleSignUp} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
