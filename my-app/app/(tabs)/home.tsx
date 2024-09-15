import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { StudentHome } from "@/components/home/StudentHome";
import { TutorHome } from "@/components/home/TutorHome";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { UserContext } from "../contexts/userContext";

export default function HomeScreen() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }
  const { personType } = context;

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sooper Tooder</ThemedText>
      </ThemedView>
      {personType === "student" ? <StudentHome /> : <TutorHome />}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 80,
    paddingLeft: 32,
    paddingBottom: 15,
  },
});
