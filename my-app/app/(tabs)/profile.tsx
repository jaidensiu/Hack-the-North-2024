import React, { useState } from 'react';
import { StyleSheet, View, Modal, TextInput, Button, Text } from 'react-native';
import ScrollView from '@/components/ScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProfileCard from '@/components/profile/ProfileCard';

interface ProfileScreenProps {
  name: string;
  role: string;
  rating: number;
  rate: string;
  phone: string,
  email: string;
  description: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ name, role, rating, rate, phone, email, description }) => {
  // TODO: use the arguments below in the useState
  const [user, setUser] = useState({
    name: 'Franklin Ma',
    role: 'Tutor',
    rating: 4.9,
    rate: '$40/hr',
    phone: '123-456-7890',
    email: 'franklinma@gmail.com',
    description: 'Hi there, my name is Franklin, my goal as a tutor is to make you smarter.'
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | number>('');

  const handleCardPress = (field: string, currentValue: string | number) => {
    // Prevent the modal from appearing for the "Rating" field
    if (field === 'Rating') return;
    
    setSelectedField(field);
    setInputValue(currentValue);
    setModalVisible(true);
  }

  const handleSave = () => {
    if (selectedField !== null) {
      const updatedValue = inputValue;
      setUser(prevState => ({
        ...prevState,
        [selectedField.toLowerCase()]: updatedValue,
      }));
      setModalVisible(false);
    }
  }

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Profile</ThemedText>
      </ThemedView>
      <ScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
        <ProfileCard title="Name" value={user.name} onPress={handleCardPress} />
        <ProfileCard title="Role" value={user.role} onPress={handleCardPress} />
        <ProfileCard title="Rating" value={user.rating} />
        <ProfileCard title="Rate" value={user.rate} onPress={handleCardPress} />
        <ProfileCard title="Phone" value={user.phone} onPress={handleCardPress} />
        <ProfileCard title="Email" value={user.email} onPress={handleCardPress} />
        <ProfileCard title="Description" value={user.description} onPress={handleCardPress} />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            {selectedField && <Text style={styles.modalTitle}>Edit {selectedField}</Text>}
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
}

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProfileScreen;
