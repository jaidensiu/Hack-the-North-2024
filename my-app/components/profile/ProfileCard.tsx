import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface ProfileCardProps {
  title: string;
  value: string | number;
  onPress?: (field: string, currentValue: string | number) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress?.(title, value)}>
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText>{value}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    marginBottom: 8,
  },
});

export default ProfileCard;
