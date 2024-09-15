import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function RecordingScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();
  const { sessionId } = useLocalSearchParams();

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    // Here you would typically upload the audio file to your backend
    // For example: await uploadAudio(uri, sessionId);
    // router.replace("/(tabs)/activity");
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Recording Session</ThemedText>
      <ThemedText style={styles.subtitle}>Session ID: {sessionId}</ThemedText>
      <TouchableOpacity onPress={toggleRecording} style={styles.recordButton}>
        <FontAwesome
          name={isRecording ? "stop-circle" : "play-circle"}
          size={64}
          color={isRecording ? "red" : "green"}
        />
      </TouchableOpacity>
      <ThemedText style={styles.instructionText}>
        {isRecording
          ? "Recording in progress..."
          : "Press start to record your session"}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  recordButton: {
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
