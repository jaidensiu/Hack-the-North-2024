import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import SignupForm from "@/components/auth/SignupForm";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserContext } from "../contexts/userContext";

export default function SignupFormScreen() {
  const router = useRouter();
  const context = useContext(UserContext);
  const [name, setName] = useState("");

  interface SignUpData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    age: number;
    gender: string;
    userType: string;
    location: string;
  }
  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }
  const { userID, setUserID } = context;
  const createUser = useMutation(api.tasks.createNewUser);

  const handleSignUp = async ({
    firstName,
    lastName,
    phoneNumber,
    email,
    age,
    gender,
    userType,
    location,
  }: SignUpData) => {
    console.log(
      "Signup with:",
      name,
      phoneNumber,
      email,
      age,
      gender,
      userType,
      location
    );
    try {
      const result = await createUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        type: userType,
        age: BigInt(age),
        topic: "temporary",
        sessionHistory: [],
        overallRating: BigInt(0),
        location: location,
      });
      setUserID(result); // Save result to the context
      console.log("User created:", result);
      if (userType === "student") {
        router.push({
          pathname: "/onboarding/choose-subject",
          params: {
            user: JSON.stringify({
              name,
              phoneNumber,
              email,
              age,
              gender,
              userType,
            }),
          },
        });
      } else {
        router.push({
          pathname: "/onboarding/choose-subject",
          params: {
            user: JSON.stringify({
              name,
              phoneNumber,
              email,
              age,
              gender,
              userType,
            }),
          },
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupForm onSignUp={handleSignUp} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
