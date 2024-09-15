import React, {useState, useRef, useMemo,useCallback} from "react";
import ScrollView from "@/components/ScrollView";
import SubjectPicker from "@/components/SubjectPicker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components//ThemedView";
import UserCard from "./UserCard";
import {StyleSheet, TextInput, FlatList} from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const dropdownOptions = [
  { label: "Physics 11", value: "physics11" },
  { label: "Biology 11", value: "biology11" },
  { label: "Physics 12", value: "physics12" },
  { label: "Biology 12", value: "biology12" },
];

export function StudentHome() {
  const [topic, setTopic] = useState("Mathematics")
  const getTutors = useQuery(api.tasks.getTutors, {topic})


  return (
    // <ScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#A1CEDC" }}>
      <ThemedView>
        <ThemedText type="subtitle" >Filter By Subject</ThemedText>
        <SubjectPicker options={dropdownOptions} />
        <TextInput
          style={styles.input}
          value={topic}
          onChangeText={setTopic}
          placeholder="Where do you need tutoring?"
          autoCapitalize="none"
    
        />        
        <FlatList
        data={getTutors}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <UserCard id={item._id} name={item.firstName} age = {Number(item.age)} distance = {Number(10)} rating = {Number(0)}
            phoneNumber={item.phoneNumber} email = {item.email} gender = {"female"} userType= {"tutor"} aboutMe = {"Hello"} avatar = {null}
          />
        )}
      />
      </ThemedView>
    // {/* </ScrollView> */}
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
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
