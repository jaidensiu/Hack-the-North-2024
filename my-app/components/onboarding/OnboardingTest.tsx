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
  writtenQuestions: string[];
  writtenAnswers: string[];
  onTestComplete: (score: number, totalQuestions: number) => void;
  onBack: () => void;
}

const API_URL = "http://10.37.118.75:6000";

export default function OnboardingTest({
  writtenQuestions,
  writtenAnswers,
  onTestComplete,
  onBack,
}: OnboardingTestProps) {
  const [answers, setAnswers] = useState<string[]>(
    new Array(writtenAnswers.length).fill("")
  );

  // print written questions and answers
  console.log("written questions: ", writtenQuestions);
  console.log("written answers: ", writtenAnswers);

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // In a real application, you would evaluate the answers here
    // For this example, we'll just use a mock score
    const mockScore = 4;

    // http fetch request to flask function and get back score
    const fullUrl = `${API_URL}/score`;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: writtenAnswers,
        tutor_response: answers,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseText = await response.text();
    console.log(responseText);

    onTestComplete(1, 2); // TODO: Replace with actual score and total questions
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
        {writtenQuestions.map((question, index) => (
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
