import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface ProfileCardProps {
  title: string;
  value: string | number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, value }) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      <ThemedText>{value}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  title: {
    marginBottom: 8,
  },
});

export default ProfileCard;
