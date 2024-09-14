// app/(tabs)/tutorHome.tsx
import React from "react";
import { StyleSheet } from "react-native";
import TutorHome from "@/components/home/TutorHome";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function TutorHomeScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Super Tutor</ThemedText>
      </ThemedView>
      <TutorHome />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 80,
    paddingLeft: 32,
    paddingBottom: 8,
  },
});
