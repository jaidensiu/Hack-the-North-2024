import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "@/components/auth/LoginForm";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserContext } from "../contexts/userContext";
import { PersonType } from "@/types/User";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }

  const { setUserID, setPersonType } = context;

  const userQuery = useQuery(api.tasks.getUser, {
    email,
    enabled: isSubmitted,
  });

  useEffect(() => {
    if (userQuery && isSubmitted) {
      if (userQuery.password === password) {
        // Note: Compare passwords on server-side in production
        setUserID(userQuery._id);
        setPersonType(userQuery.type as PersonType);
        console.log("Retrieved user:", userQuery);
        // push with params
        router.push({
          pathname: "/(tabs)/home",
          params: {
            userType: userQuery.type,
          },
        });
      } else {
        console.error("Incorrect password");
      }
      setIsSubmitted(false); // Reset submission state
    }
  }, [userQuery, isSubmitted]);

  const handleLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setIsSubmitted(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm onLogin={handleLogin} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
