import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

export interface DropdownProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
}

const SubjectPicker: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={onValueChange}
    >
      <Picker.Item label="Select a subject" value="" />
      {options.map((option) => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    marginBottom: 15,
  },
});

export default SubjectPicker;
