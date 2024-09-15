import { StyleSheet } from "react-native";

import ScrollView from "@/components/ScrollView";
import SubjectPicker from "@/components/SubjectPicker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const dropdownOptions = [
    { label: "All", value: "all" },
    { label: "Physics 11", value: "physics11" },
    { label: "Biology 11", value: "biology11" },
    { label: "Physics 12", value: "physics12" },
    { label: "Biology 12", value: "biology12" },
  ];

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">SuberTuder</ThemedText>
      </ThemedView>
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
