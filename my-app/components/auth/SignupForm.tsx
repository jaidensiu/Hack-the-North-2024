import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface SignUpFormProps {
  onSignUp: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    age: number;
    gender: string;
    userType: "student" | "tutor";
    location: string;
  }) => void;
  onBack: () => void;
}

export default function SignUpForm({ onSignUp, onBack }: SignUpFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState<"student" | "tutor">("student");

  const handleSignUp = () => {
    onSignUp({ firstName, lastName, phoneNumber, email, age, gender, userType , location});
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Sign Up</ThemedText>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <ThemedText style={styles.label}>First Name</ThemedText>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder=""
        />
        <ThemedText style={styles.label}>Last Name</ThemedText>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder=""
        />
        <ThemedText style={styles.label}>Phone Number</ThemedText>
        <View style={styles.phoneInput}>
          <TextInput
            style={styles.phoneNumber}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder=""
            keyboardType="phone-pad"
          />
        </View>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder=""
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <ThemedText style={styles.label}>Age</ThemedText>
            <Picker
              selectedValue={age}
              onValueChange={(itemValue) => setAge(itemValue)}
              style={styles.picker}
            >
              {[...Array(83)].map((_, i) => (
                <Picker.Item key={i} label={`${i + 18}`} value={`${i + 18}`} />
              ))}
            </Picker>
          </View>
          <View style={styles.halfWidth}>
            <ThemedText style={styles.label}>Gender</ThemedText>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

        <ThemedText style={styles.label}>I am a:</ThemedText>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.studentTutorToggler,
              userType === "student" && styles.selected,
            ]}
            onPress={() => setUserType("student")}
          >
            <ThemedText>Student</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.studentTutorToggler,
              userType === "tutor" && styles.selected,
            ]}
            onPress={() => setUserType("tutor")}
          >
            <ThemedText>Tutor</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <ThemedText style={styles.buttonText}>Submit</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 24, 
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
  label: {
    fontSize: 16, 
    marginBottom: 8,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 4, 
    padding: 8, 
    marginBottom: 16, 
  },
  phoneInput: {
    flexDirection: "row", marginBottom: 15,
  },
  countryCode: {
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 4, 
    padding: 10, 
    width: 64, 
    marginRight: 8, 
  },
  phoneNumber: {
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 4, 
    padding: 8, 
  },
  row: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 15,
  },
  halfWidth: {
    width: "48%",
  },
  picker: {
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  studentTutorToggler: {
    padding: 10,
    borderWidth: 1, 
    borderColor: "transparent", 
    borderRadius: 4,
  },
  selected: {
    borderColor: "#0081FB",
  },
  radioGroup: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 8, 
  },
  buttonContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 8, 
  },
  button: {
    backgroundColor: "#0081FB", 
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4, 
    marginVertical: 8,
    alignItems: "center", 
  },
  buttonText: {
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold",
  },
});
