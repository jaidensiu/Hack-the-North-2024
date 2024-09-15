import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface OnboardingResultsProps {
  score: number;
  totalQuestions: number;
  onFinish: () => void;
  onBack: () => void;
}

export default function OnboardingResults({
  score,
  totalQuestions,
  onFinish,
  onBack,
}: OnboardingResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ThemedText>Back</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Your Results</ThemedText>
        <View style={styles.placeholderIcon} />
      </View>

      <View style={styles.resultsContainer}>
        <ThemedText style={styles.score}>{percentage.toFixed(2)}%</ThemedText>
        <ThemedText style={styles.detail}>
          You answered {score} out of {totalQuestions} questions correctly.
        </ThemedText>
      </View>

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
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholderIcon: {
    width: 24,
    height: 24,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    textAlign: "center",
  },
  finishButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
