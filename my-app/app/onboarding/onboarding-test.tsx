import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import OnboardingTest from "@/components/onboarding/OnboardingTest";

export default function OnboardingTestScreen() {
  const router = useRouter();
  let { writtenQuestions, writtenAnswers } = useLocalSearchParams();
  writtenQuestions = JSON.parse(writtenQuestions as string);
  writtenAnswers = JSON.parse(writtenAnswers as string);

  console.log("written questions in test page: ", writtenQuestions);
  console.log(
    "written questions in test page, stringify: ",
    JSON.stringify(writtenQuestions)
  );

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
