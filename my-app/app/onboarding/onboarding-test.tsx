import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import OnboardingTest from "@/components/onboarding/OnboardingTest";

export default function OnboardingTestScreen() {
  const router = useRouter();
  const { writtenQuestions, writtenAnswers } = useLocalSearchParams<{
    writtenQuestions: string[];
    writtenAnswers: string[];
  }>();

  console.log("written questions in general page: ", writtenQuestions);
  console.log("written answers in general page: ", writtenAnswers);

  const handleTestComplete = (score: number, totalQuestions: number) => {
    router.push({
      pathname: "/onboarding/onboarding-results" as const,
      params: { score, totalQuestions },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingTest
        writtenQuestions={
          Array.isArray(writtenQuestions)
            ? writtenQuestions
            : [writtenQuestions]
        }
        writtenAnswers={
          Array.isArray(writtenAnswers) ? writtenAnswers : [writtenAnswers]
        }
        onTestComplete={handleTestComplete}
        onBack={() => router.back()}
      />
    </SafeAreaView>
  );
}
