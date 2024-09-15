import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserCard from "@/components/home/UserCard";
import { User } from "@/types/User";

import avatar1 from "@/assets/images/kim.jpeg";
import avatar2 from "@/assets/images/kim.jpeg";

export function TutorHome() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      phoneNumber: "123-456-7890",
      email: "johndoe@gmail.com",
      age: 25,
      gender: "Male",
      userType: "tutor",
      distance: 5,
      rating: 4,
      avatar: avatar1,
      aboutMe: "I'm a passionate biology tutor with 5 years of experience.",
    },
    {
      id: "2",
      name: "Jane Smith",
      phoneNumber: "123-456-7890",
      email: "janesmith@gmail.com",
      age: 30,
      gender: "Female",
      userType: "tutor",
      distance: 3,
      rating: 5,
      avatar: avatar2,
      aboutMe: "Math enthusiast here! I specialize in calculus and statistics.",
    },
  ]);

  const handleAccept = async (id: string) => {
    console.log(`Accepted user with id: ${id}`);
    try {
      // const sessionId = await establishConnection({ tutorId: "your-tutor-id", studentId: id });
      const sessionId = 1;
      router.replace({
        pathname: "../recording/[sessionId]" as const,
        params: { sessionId: sessionId.toString() },
      });
    } catch (error) {
      console.error("Failed to establish connection:", error);
    }
  };

  const handleReject = (id: string) => {
    console.log(`Rejected user with id: ${id}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <ScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView>
        <ThemedText style={styles.subtitle} type="subtitle">
          Requests
        </ThemedText>
        {users.map((user) => (
          <UserCard
            key={user.id}
            {...user}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    paddingBottom: 16,
  },
});
