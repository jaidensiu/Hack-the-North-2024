import React from "react";
import ScrollView from "@/components/ScrollView";
import SubjectPicker from "@/components/SubjectPicker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components//ThemedView";

const dropdownOptions = [
  { label: "Physics 11", value: "physics11" },
  { label: "Biology 11", value: "biology11" },
  { label: "Physics 12", value: "physics12" },
  { label: "Biology 12", value: "biology12" },
];

export function StudentHome() {
  return (
    <ScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#A1CEDC" }}>
      <ThemedView>
        <ThemedText type="subtitle">Subject</ThemedText>
        <SubjectPicker options={dropdownOptions} />
        <ThemedText>item0</ThemedText>
        <ThemedText>item1</ThemedText>
        <ThemedText>item2</ThemedText>
        <ThemedText>item3</ThemedText>
        <ThemedText>item4</ThemedText>
        <ThemedText>item5</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}
