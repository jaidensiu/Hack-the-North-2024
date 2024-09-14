// components/home/TutorHome.tsx
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserCard from "@/components/home/UserCard";

interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  distance: number;
  rating: number;
  avatar: any;
  aboutMe: string;
}

import avatar1 from "@/assets/images/kim.jpeg";
import avatar2 from "@/assets/images/kim.jpeg";

export default function Tutor() {
  const [userType] = useState<"student" | "tutor">("tutor");

  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      age: 25,
      gender: "Male",
      distance: 5,
      rating: 4,
      avatar: avatar1,
      aboutMe: "Im a passionate biology tutor with 5 years of experience.",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 30,
      gender: "Female",
      distance: 3,
      rating: 5,
      avatar: avatar2,
      aboutMe: "Math enthusiast here! I specialize in calculus and statistics.",
    },
  ];

  const handleAccept = (id: string) => {
    console.log(`Accepted user with id: ${id}`);
    // TODO: Implement accept logic
  };

  const handleReject = (id: string) => {
    console.log(`Rejected user with id: ${id}`);
    // TODO: Implement reject logic
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
            isTutor={userType === "student"}
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
