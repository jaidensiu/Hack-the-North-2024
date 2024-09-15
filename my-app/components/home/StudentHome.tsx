import React, { useState, useCallback } from "react";
import { StyleSheet, TextInput, FlatList, View, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserCard from "./UserCard";
import SubjectPicker from "@/components/SubjectPicker";

// Import dummy avatar images
import avatar1 from "@/assets/images/kim.jpeg";
import avatar2 from "@/assets/images/kim.jpeg";

const dropdownOptions = [
  { label: "Physics 11", value: "physics11" },
  { label: "Biology 11", value: "biology11" },
  { label: "Physics 12", value: "physics12" },
  { label: "Biology 12", value: "biology12" },
]; // TODO: Replace with actual subjects later

const dummyTutors = [
  {
    id: "1",
    name: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    age: 25,
    gender: "Male",
    userType: "tutor" as const,
    distance: 5,
    rating: 4,
    avatar: avatar1,
    aboutMe: "Experienced Physics tutor with a passion for teaching.",
    topic: "physics11",
  },
  {
    id: "2",
    name: "Jane Smith",
    phoneNumber: "098-765-4321",
    email: "jane@example.com",
    age: 28,
    gender: "Female",
    userType: "tutor" as const,
    distance: 3,
    rating: 5,
    avatar: avatar2,
    aboutMe: "Biology specialist with 5 years of tutoring experience.",
    topic: "biology12",
  },
];

export function StudentHome() {
  const [location, setLocation] = useState("Address");
  const [selectedSubject, setSelectedSubject] = useState("");

  const filteredTutors = useCallback(() => {
    return dummyTutors.filter(
      (tutor) => !selectedSubject || tutor.topic === selectedSubject
    );
  }, [selectedSubject]);

  const handleRequest = (id: string) => {
    const tutor = dummyTutors.find((t) => t.id === id);
    if (tutor) {
      Alert.alert(
        "Request Sent",
        `Your request has been sent to ${tutor.name}. They will contact you soon.`,
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
        data={filteredTutors()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            id={item.id}
            name={item.name}
            age={item.age}
            distance={item.distance}
            rating={item.rating}
            phoneNumber={item.phoneNumber}
            email={item.email}
            gender={item.gender}
            userType={item.userType}
            aboutMe={item.aboutMe}
            avatar={item.avatar}
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
