import React, { useState, useCallback } from "react";
import { StyleSheet, TextInput, FlatList, View, Alert } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserCard from "./UserCard";
import SubjectPicker from "@/components/SubjectPicker";

const dropdownOptions = [
  { label: "Physics 11", value: "physics11" },
  { label: "Linear Algebra", value: "linearalgebra" },
  { label: "Organic Chemistry", value: "organicchemistry" },
  { label: "Japanese", value: "japanese" },
];

import owlAvatar from "@/assets/images/owl.png";

export function StudentHome() {
  const [location, setLocation] = useState("Address");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Use the Convex query to fetch tutors
  const tutors = useQuery(api.tasks.getTutors, { topic: selectedSubject });

  const handleRequest = (id: string) => {
    const tutor = tutors?.find((t) => t._id === id);
    if (tutor) {
      Alert.alert(
        "Request Sent",
        `Your request has been sent to ${tutor.firstName} ${tutor.lastName}. They will contact you soon.`,
        [{ text: "OK" }]
      );
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText type="subtitle">Filter By Subject</ThemedText>
      <SubjectPicker
        options={dropdownOptions}
        selectedValue={selectedSubject}
        onValueChange={setSelectedSubject}
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Where do you want to find a tutor?"
        autoCapitalize="none"
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={tutors}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <UserCard
            id={item._id}
            name={`${item.firstName} ${item.lastName}`}
            age={Number(item.age)}
            distance={0} // You might need to calculate this based on user's location
            rating={Number(item.overallRating)}
            phoneNumber={item.phoneNumber}
            email={item.email}
            gender="" // Add this field to your user schema if needed
            userType={item.type as "tutor" | "student"}
            aboutMe="" // Add this field to your user schema if needed
            avatar={owlAvatar} // You might need to handle avatar differently
            onRequest={handleRequest}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  listContent: {
    padding: 32,
  },
});
