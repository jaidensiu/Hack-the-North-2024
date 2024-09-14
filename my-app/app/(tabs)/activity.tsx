// app/(tabs)/activity.tsx
import React from "react";
import { StyleSheet } from "react-native";
import Activity from "@/components/activity/Activity";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ActivityScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Activity</ThemedText>
      </ThemedView>
      <Activity />
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
