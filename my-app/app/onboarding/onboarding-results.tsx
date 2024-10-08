import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import OnboardingResults from "@/components/onboarding/OnboardingResults";

export default function OnboardingResultsScreen() {
  const router = useRouter();
  const { score, totalQuestions, subject } = useLocalSearchParams();

  const handleFinish = () => {
    router.replace({
      pathname: "/(tabs)/home" as const,
      params: { subject },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingResults
        score={Number(score)}
        totalQuestions={Number(totalQuestions)}
        onFinish={handleFinish}
      />
    </SafeAreaView>
  );
}
