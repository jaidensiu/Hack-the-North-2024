import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface OnboardingTestProps {
  onTestComplete: (score: number, totalQuestions: number) => void;
  onBack: () => void;
}

const mockQuestions = [
  "What is 2 + 2?",
  "Who wrote Romeo and Juliet?",
  "What is the capital of France?",
  "What is the chemical symbol for water?",
  "In which year did World War II end?",
];

export default function OnboardingTest({
  onTestComplete,
  onBack,
}: OnboardingTestProps) {
  const [answers, setAnswers] = useState<string[]>(
    new Array(mockQuestions.length).fill("")
  );

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // In a real application, you would evaluate the answers here
    // For this example, we'll just use a mock score
    const mockScore = 4;
    onTestComplete(mockScore, mockQuestions.length);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ThemedText>Back</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Onboarding Test</ThemedText>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {mockQuestions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <ThemedText style={styles.question}>{question}</ThemedText>
            <TextInput
              style={styles.input}
              value={answers[index]}
              onChangeText={(text) => handleAnswerChange(index, text)}
              placeholder="Enter your answer"
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
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
  form: {
    flexGrow: 1,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
