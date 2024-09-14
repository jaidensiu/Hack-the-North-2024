import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface DropdownProps {
  label: string;
  options: { label: string; value: string }[];
}

const DropdownComponent: React.FC<DropdownProps> = ({ label, options }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={options}
        style={pickerSelectStyles}
        placeholder={{ label: 'All', value: null }}
        value={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderRadius: 8,
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default DropdownComponent;
