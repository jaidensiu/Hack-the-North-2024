import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import OnboardingTest from "@/components/onboarding/OnboardingTest";

export default function OnboardingTestScreen() {
  const router = useRouter();
  const { subject, userType } = useLocalSearchParams();

  const handleTestComplete = (score: number, totalQuestions: number) => {
    router.push({
      pathname: "/onboarding/onboarding-results" as const,
      params: { score, totalQuestions, subject, userType },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingTest
        onTestComplete={handleTestComplete}
        onBack={() => router.back()}
      />
    </SafeAreaView>
  );
}
