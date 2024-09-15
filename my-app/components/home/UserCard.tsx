import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { User } from "@/types/User";

interface UserCardProps extends User {
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  age,
  gender,
  distance,
  rating,
  avatar,
  userType,
  aboutMe,
  onAccept,
  onReject,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const isTutor = userType === "tutor";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: pressed ? "#e6ffe6" : "white" },
      ]}
      onPress={toggleExpand}
    >
      {({ pressed }) => (
        <>
          <View style={styles.topRow}>
            {avatar && <Image source={avatar} style={styles.avatar} />}
            <View style={styles.infoContainer}>
              <ThemedText style={styles.name}>{name}</ThemedText>
              <ThemedText>
                {age} years old • {gender}
              </ThemedText>
              <ThemedText>{distance} km away</ThemedText>
              {!isTutor && (
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AntDesign
                      key={star}
                      name={star <= rating ? "star" : "staro"}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              )}
            </View>
            <AntDesign
              name={expanded ? "up" : "down"}
              size={24}
              color="#888"
              style={styles.expandIcon}
            />
          </View>
          {expanded && (
            <View style={styles.expandedContent}>
              <ThemedText style={styles.aboutMe}>{aboutMe}</ThemedText>
            </View>
          )}
          {isTutor && (
            <View style={styles.actionContainer}>
              <Pressable
                onPress={() => onAccept && onAccept(id)}
                style={({ pressed }) => [
                  styles.actionButton,
                  { backgroundColor: pressed ? "#e6ffe6" : "transparent" },
                ]}
              >
                <AntDesign name="check" size={24} color="green" />
              </Pressable>
              <Pressable
                onPress={() => onReject && onReject(id)}
                style={({ pressed }) => [
                  styles.actionButton,
                  { backgroundColor: pressed ? "#ffe6e6" : "transparent" },
                ]}
              >
                <AntDesign name="close" size={24} color="red" />
              </Pressable>
            </View>
          )}
        </>
      )}
    </Pressable>
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
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  expandIcon: {
    marginLeft: "auto",
  },
  expandedContent: {
    marginTop: 12,
  },
  aboutMe: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
});

export default UserCard;
