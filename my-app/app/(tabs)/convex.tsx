import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Text, View, Button } from "react-native";
import { useState } from "react";

export default function Convex() {
  const tasks = useQuery(api.tasks.get);
  const createUser = useMutation(api.tasks.createNewUser);
  const createSession = useMutation(api.tasks.createNewSession);
  const updateSessionHistory = useMutation(api.tasks.updateUserSessionHistory);
  const student = useQuery(api.tasks.getUser, {email: 'olivia.harris@example.com'})
  const tutor = useQuery(api.tasks.getUser, {email: 'nate.white@example.com'})
  const [userID, setUSerID] = useState("");  // State to store the result
  const [currentSession, setCurrentSession] = useState("");  // State to store the result

  const handleCreateUserButton = async () => {
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

  const handleCreateNewSession = async () => {
    try {

      if (!student || !tutor) {
        console.error('Student or Tutor not found.');
        return;
      }

      const result = await createSession({
        studentID: student._id,
        tutorID: tutor._id,
        studentsFeedback: "They were a great tutor.",
        studentsRating: BigInt(4),
        tutorsFeedback: "They were very polite and well prepared.",
        tutorsRating: BigInt(3)
      });
      setCurrentSession(result); 

      await updateSessionHistory({
        id: student._id,
        sessionHistory: [result]
      })

      await updateSessionHistory({
        id: tutor._id,
        sessionHistory: [result]
      })

      console.log('New Session Created', result);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  }

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

      {/* <Button
        onPress={handleCreateUserButton}
        title="Press here to create a new user"
        color="#841584"
        accessibilityLabel="Press here to create a new user"
      />
      
      {userID && <Text>Created user: {userID}</Text>} */}
      <Button
        onPress={handleCreateNewSession}
        title="Press here to create a new session"
        color="#841584"
        accessibilityLabel="Press here to create a new session"
      />
    </View>
  );
}
