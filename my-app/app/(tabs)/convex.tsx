import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Text, View, Button } from "react-native";

export default function Convex() {
  const tasks = useQuery(api.tasks.get);
  const createUser = useMutation(api.tasks.createNewUser);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tasks?.map(({ _id, firstName }) => <Text key={_id}>{firstName}</Text>)}
        <Button
    onPress={() => {      
      createUser({
        firstName: 'newUser',
        lastName: "last",
        email: 'user@example.com',
        phoneNumber: '234-125-3496',
        type: 'student',
        age: BigInt(14),
        topic: "Biology 12",
        sessionHistory: [],
        overallRating: BigInt(0)
      });
    }}
    title="Press here to create a new user"
    color="#841584"
    accessibilityLabel="Press here to create a new user"
  />
    </View>
  );
}