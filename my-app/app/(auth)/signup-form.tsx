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
