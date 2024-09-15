// components/home/TutorHome.tsx
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
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
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      age: 25,
      gender: "Male",
      distance: 5,
      rating: 4,
      avatar: avatar1,
      aboutMe: "I'm a passionate biology tutor with 5 years of experience.",
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
  ]);

  const handleAccept = (id: string) => {
    console.log(`Accepted user with id: ${id}`);
    // Implement accept logic
    const acceptedUser = users.find((user) => user.id === id);
    if (acceptedUser) {
      // You might want to update some state or make an API call here
      // For example, you could mark the user as accepted in your backend
      // Create a session between the tutor and the student. For the student
    }
  };

  const handleReject = (id: string) => {
    console.log(`Rejected user with id: ${id}`);
    // Implement reject logic
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    // You might want to make an API call here to update the rejected status in your backend
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
