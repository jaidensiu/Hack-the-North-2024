// Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingTop: 30,
    width: '100%',
    backgroundColor: '#0081FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Header;
