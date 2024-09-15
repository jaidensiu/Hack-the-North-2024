import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface ChooseSubjectProps {
  onSubjectChosen: (subject: string) => void;
  onBack: () => void;
}

const subjects = ["Math", "Science", "History", "English", "Art", "Music"];

export default function ChooseSubject({
  onSubjectChosen,
  onBack,
}: ChooseSubjectProps) {
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    onSubjectChosen(subject);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ThemedText>Back</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Choose a Subject</ThemedText>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.subjectList}>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject}
            style={[
              styles.subjectCard,
              selectedSubject === subject && styles.selectedSubjectCard,
            ]}
            onPress={() => handleSubjectSelect(subject)}
          >
            <ThemedText
              style={[
                styles.subjectText,
                selectedSubject === subject && styles.selectedSubjectText,
              ]}
            >
              {subject}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  subjectList: {
    flexGrow: 1,
  },
  subjectCard: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedSubjectCard: {
    backgroundColor: "#0081FB",
  },
  subjectText: {
    fontSize: 16,
  },
  selectedSubjectText: {
    color: "white",
  },
});
