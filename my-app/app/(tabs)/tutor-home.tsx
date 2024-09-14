import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import ScrollView from '@/components/ScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import UserCard from '@/components/UserCard';

interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  distance: number;
  rating: number;
  avatar: any;
  aboutMe: string;
}

import avatar1 from '@/assets/images/kim.jpeg';
import avatar2 from '@/assets/images/kim.jpeg';

export default function HomeScreen() {
  const [userType, setUserType] = useState<'student' | 'tutor'>('tutor');

  const users: User[] = [
    { 
      id: '1', 
      name: 'John Doe', 
      age: 25, 
      gender: 'Male', 
      distance: 5, 
      rating: 4, 
      avatar: avatar1, // Use the imported image here
      aboutMe: 'Im a passionate biology tutor with 5 years of experience. I love helping students understand complex concepts in simple ways.'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      age: 30, 
      gender: 'Female', 
      distance: 3, 
      rating: 5, 
      avatar: avatar2, // Use the imported image here
      aboutMe: 'Math enthusiast here! I specialize in calculus and statistics. My goal is to make math fun and accessible for everyone.'
    },
  ];

  const handleAccept = (id: string) => {
    console.log(`Accepted user with id: ${id}`);
    // Implement accept logic here
  };

  const handleReject = (id: string) => {
    console.log(`Rejected user with id: ${id}`);
    // Implement reject logic here
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Incoming Requests from Students</ThemedText>
      </ThemedView>
      <ScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
        <ThemedView>
          {users.map((user) => (
            <UserCard
              key={user.id}
              {...user}
              isTutor={userType === 'student'}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 80,
    paddingLeft: 32,
    paddingBottom: 8
  },
});