import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import ChooseSubject from "@/components/onboarding/ChooseSubject";

export default function ChooseSubjectScreen() {
  const router = useRouter();
  const userType = "tutor";

  const handleSubjectChosen = (subject: string) => {
    if (userType === "tutor") {
      router.push({
        pathname: "/onboarding/onboarding-test" as const,
        params: { subject, userType },
      });
    } else {
      router.replace({
        pathname: "/(tabs)/studentHome",
        params: { subject },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChooseSubject
        onSubjectChosen={handleSubjectChosen}
        onBack={() => router.back()}
      />
    </SafeAreaView>
  );
}
