import { StyleSheet, Image } from 'react-native';

import ScrollView from '@/components/ScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ActivityScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Activity</ThemedText>
      </ThemedView>
      <ScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
        <ThemedView>
          <ThemedText>item0</ThemedText>
          <ThemedText>item1</ThemedText>
          <ThemedText>item2</ThemedText>
          <ThemedText>item3</ThemedText>
          <ThemedText>item4</ThemedText>
          <ThemedText>item5</ThemedText>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 96,
    paddingLeft: 32
  },
});
