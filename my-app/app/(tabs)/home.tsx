import { StyleSheet } from 'react-native';

import ScrollView from '@/components/ScrollView';
import DropdownComponent from '@/components/Dropdown';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const dropdownOptions = [
    { label: 'Physics 11', value: 'physics11' },
    { label: 'Biology 11', value: 'biology11' },
    { label: 'Physics 12', value: 'physics12' },
    { label: 'Biology 12', value: 'biology12' },
  ];

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">SuberTuder</ThemedText>
      </ThemedView>
      <ScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
        <ThemedView>
          <DropdownComponent
            label="Subject"
            options={dropdownOptions} />
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
    paddingTop: 80,
    paddingLeft: 32,
    paddingBottom: 8
  },
});
