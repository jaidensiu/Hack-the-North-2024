import React from "react";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Activity() {
  return (
    <ScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView>
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
