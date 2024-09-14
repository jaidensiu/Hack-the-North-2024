import React, { useState } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SignupFormScreen() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('18');
  const [gender, setGender] = useState('Male');
  const [userType, setUserType] = useState<'student' | 'tutor'>('student');
  const router = useRouter();

  const handleSignup = () => {
    console.log('Signup with:', name, phoneNumber, email, age, gender, userType);
    // HI KIM
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Sign Up</ThemedText>
          <View style={styles.placeholderIcon} />
        </View>

        <View style={styles.form}>
          <ThemedText style={styles.label}>Name*</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tanzim Kabir"
          />

          <ThemedText style={styles.label}>Phone no.*</ThemedText>
          <View style={styles.phoneInput}>
            <TextInput
              style={styles.countryCode}
              value="+880"
              editable={false}
            />
            <TextInput
              style={styles.phoneNumber}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="1710008927"
              keyboardType="phone-pad"
            />
          </View>

          <ThemedText style={styles.label}>Email</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
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
                  <Picker.Item key={i} label={`${i+18}`} value={`${i+18}`} />
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
        <RadioButton.Group onValueChange={value => setUserType(value as 'student' | 'tutor')} value={userType}>
          <View style={styles.radioGroup}>
            <TouchableRipple onPress={() => setUserType('student')}>
              <View style={styles.radioButton}>
                <RadioButton value="student" />
                <ThemedText>Student</ThemedText>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => setUserType('tutor')}>
              <View style={styles.radioButton}>
                <RadioButton value="tutor" />
                <ThemedText>Tutor</ThemedText>
              </View>
            </TouchableRipple>
          </View>
        </RadioButton.Group>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <ThemedText style={styles.buttonText}>Submit</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  phoneInput: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  countryCode: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 60,
    marginRight: 10,
  },
  phoneNumber: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfWidth: {
    width: '48%',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleSelected: {
    borderColor: 'green',
  },
  radioLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});