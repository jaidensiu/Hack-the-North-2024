import React from "react";
import SessionCard from "./sessionCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FlatList, View, Text } from "react-native";
import { Id } from "@/convex/_generated/dataModel";

export default function Activity() {
  const user = useQuery(api.tasks.getUser, {
    email: "rita.garcia@example.com",
    enabled: true,
  });

  const getSessions = useQuery(
    api.tasks.getTutorSessions,
    user ? { id: user._id } : "skip"
  );

  if (!user) {
    return (
      <View>
        <Text>Loading user...</Text>
      </View>
    );
  }

  if (getSessions === undefined) {
    return (
      <View>
        <Text>Loading sessions...</Text>
      </View>
    );
  }

  const topic = user.topic;

  return (
    <FlatList
      data={getSessions}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <SessionCard
          name={item.studentName}
          lastName={item.studentLastName}
          rating={Number(item.studentsRating)}
          topic={topic}
          location="Waterloo"
        />
      )}
    />
  );
}
