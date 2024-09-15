import { useState, useContext } from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import ChooseSubject from "@/components/onboarding/ChooseSubject";
import { UserContext } from "../contexts/userContext"; // Adjust the import path as needed

const API_URL = "http://10.37.118.75:6000";

export default function ChooseSubjectScreen() {
  const router = useRouter();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }

  const handleSubjectChosen = async (subject: string) => {
    try {
      console.log(`Making API call to ${API_URL}/qas with subject: ${subject}`);
      // Full URL
      const fullUrl = `${API_URL}/qas?subject=${subject}`;
      console.log(`Making API call to ${fullUrl}`);

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Flask server response:", data);
      const writtenQuestions = data["written_questions"];
      const writtenAnswers = data["written_answers"];

      const userType = "tutor"; // TODO: Replace with the actual user type
      // Navigate based on user type
      if (userType === "tutor") {
        router.push({
          pathname: "/onboarding/onboarding-test",
          params: {
            subject,
            writtenQuestions: JSON.stringify(writtenQuestions),
            writtenAnswers: JSON.stringify(writtenAnswers),
          },
        });
      } else {
        router.replace({
          pathname: "/(tabs)/studentHome",
          params: {
            subject,
            writtenQuestions,
            writtenAnswers,
          },
        });
      }
    } catch (error) {
      console.error("Error updating subject:", error);
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
