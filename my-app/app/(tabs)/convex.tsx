import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Text, View, Button } from "react-native";
import { useState } from "react";

export default function Convex() {
  const tasks = useQuery(api.tasks.get);
  
  const createUser = useMutation(api.tasks.createNewUser);
  const [userID, setUSerID] = useState("");  // State to store the result

  const handlePress = async () => {
    try {
      const result = await createUser({
        firstName: 'newUser',
        lastName: "last",
        email: 'user@example.com',
        phoneNumber: '234-125-3496',
        type: 'student',
        age: BigInt(14),
        topic: "Biology 12",
        sessionHistory: [],
        overallRating: BigInt(0),
      });
      setUSerID(result);  // Save the result to the state
      console.log('User created:', result);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tasks?.map(({ _id, firstName }) => (
        <Text key={_id}>{firstName}</Text>
      ))}

      <Button
        onPress={handlePress}
        title="Press here to create a new user"
        color="#841584"
        accessibilityLabel="Press here to create a new user"
      />
      
      {userID && <Text>Created user: {userID}</Text>}
    </View>
  );
}
