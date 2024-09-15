import React from "react";
import { StyleSheet } from "react-native";
import { StudentHome } from "@/components/home/StudentHome";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">SuberTuder</ThemedText>
      </ThemedView>
      <StudentHome />
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
