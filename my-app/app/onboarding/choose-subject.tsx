import axios from "axios";
import { useState, useContext } from "react";
import { SafeAreaView, Alert } from "react-native";
import { useRouter } from "expo-router";
import ChooseSubject from "@/components/onboarding/ChooseSubject";
import { UserContext } from "../contexts/userContext"; // Adjust the import path as needed

const API_URL = "http://localhost:6000"; // Replace with your Flask server's IP and port

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function ChooseSubjectScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }
  const { userID, setUserID } = context;

  const handleSubjectChosen = async (subject: string) => {
    setIsLoading(true);
    try {
      console.log(`Making API call to ${API_URL}/qas with subject: ${subject}`);

      // Make API call to Flask server with subject as a query parameter
      const response = await apiClient.get("/qas", {
        params: { subject: subject },
        timeout: 10000, // 10 seconds timeout
      });

      console.log("Flask server response:", response.data);

      const { writtenQuestions, writtenAnswers } = response.data;

      const userType = "tutor"; // Replace with the actual user type
      // Navigate based on user type
      if (userType === "tutor") {
        router.push({
          pathname: "/onboarding/onboarding-test" as const,
          params: {
            subject,
            userType,
            writtenQuestions: JSON.stringify(writtenQuestions),
            writtenAnswers: JSON.stringify(writtenAnswers),
          },
        });
      } else {
        router.replace({
          pathname: "/(tabs)/studentHome",
          params: {
            subject,
            writtenQuestions: JSON.stringify(writtenQuestions),
            writtenAnswers: JSON.stringify(writtenAnswers),
          },
        });
      }
    } catch (error) {
      console.error("Error updating subject:", error);
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error details:",
          error.response?.data || error.message
        );
        Alert.alert(
          "Error",
          `Network error: ${error.message}. Please check your connection and try again.`
        );
      } else {
        console.error("Unexpected error:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
