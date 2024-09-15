import React, { useContext, useState } from "react";
import { StyleSheet, View, Modal, TextInput, Button, Text } from "react-native";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ProfileCard from "@/components/profile/ProfileCard";
import { api } from "@/convex/_generated/api";
import { UserContext } from "../contexts/userContext";
import { useQuery } from "convex/react";

const ProfileScreen: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("ProfileScreen must be used within a UserProvider");
  }
  const { userID } = context;
  if (!userID) {
    return null;
  }
  const user = useQuery(api.tasks.getUserFromID, { id: userID });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | number>("");

  if (!user) {
    return null;
  }

  const name = user.firstName + " " + user.lastName;

  const handleCardPress = (field: string, currentValue: string | number) => {
    if (field === "Rating") return;

    setSelectedField(field);
    setInputValue(currentValue);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (selectedField !== null) {
      // TODO: Implement save functionality with Convex mutation
      setModalVisible(false);
    }
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Profile</ThemedText>
      </ThemedView>
      <ScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
        <ProfileCard title="Name" value={name} onPress={handleCardPress} />
        <ProfileCard title="Role" value={user.type} onPress={handleCardPress} />
        <ProfileCard title="Rating" value={Number(user.overallRating)} />
        <ProfileCard
          title="Phone"
          value={user.phoneNumber}
          onPress={handleCardPress}
        />
        <ProfileCard
          title="Email"
          value={user.email}
          onPress={handleCardPress}
        />
        <ProfileCard
          title="Description"
          value="Hi there, I love teaching and meeting new people. It is one of the best joys of the world!"
          onPress={handleCardPress}
        />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            {selectedField && (
              <Text style={styles.modalTitle}>Edit {selectedField}</Text>
            )}
            <TextInput
              style={styles.input}
              value={inputValue.toString()}
              onChangeText={setInputValue}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 80,
    paddingLeft: 32,
    paddingBottom: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ProfileScreen;
