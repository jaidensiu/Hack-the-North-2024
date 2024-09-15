import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface OnboardingResultsProps {
  score: number;
  totalQuestions: number;
  onFinish: () => void;
}

export default function OnboardingResults({
  score,
  totalQuestions,
  onFinish,
}: OnboardingResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Your Results</ThemedText>
        <View style={styles.placeholderIcon} />
      </ThemedView>

      <ThemedView style={styles.resultsContainer}>
        <ThemedText style={styles.score}>{percentage.toFixed(2)}%</ThemedText>
        <ThemedText style={styles.detail}>
          You answered {score} out of {totalQuestions} questions correctly.
        </ThemedText>
      </ThemedView>

      <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
        <ThemedText style={styles.finishButtonText}>Finish</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholderIcon: {
    width: 40,
    height: 0,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0081FB",
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    textAlign: "center",
  },
  finishButton: {
    backgroundColor: "#0081FB",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
