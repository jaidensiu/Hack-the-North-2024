import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useRouter, Href } from "expo-router";

export default function HomeRouter() {
  const [user, setUser] = useState<{ role: string; id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      // TODO: Replace with actual user data fetching logic
      const userData = { role: "student", id: "1" };
      setUser(userData);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let route: Href<any>;
      if (!user) {
        // If there's no user, redirect to login
        route = "/(auth)/login" as Href<"/(auth)/login">;
      } else if (user.role === "student") {
        route = "/(app)/home" as Href<"/(app)/home">;
      } else if (user.role === "tutor") {
        route = "/(app)/tutorHome" as Href<"/(app)/tutorHome">;
      } else {
        // Fallback in case of an unknown role
        route = "/(auth)/login" as Href<"/(auth)/login">;
      }
      router.replace(route);
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    // Return a loading indicator while checking user status
    return <Text>Loading...</Text>;
  }

  // This component doesn't render anything itself, it only handles navigation
  return null;
}
