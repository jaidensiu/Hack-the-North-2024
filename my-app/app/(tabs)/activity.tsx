// app/(tabs)/activity.tsx
import React from "react";
import { StyleSheet } from "react-native";
import Activity from "@/components/activity/Activity";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ConvexReactClient } from "convex/react";
import Header from "../../components/Header"

export default function ActivityScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <Header title="Your Week in Review" />
    
      </ThemedView>
      <Activity />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 8,
  },
});
