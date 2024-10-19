import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

interface CustomHeaderProps {
  title: string; // Define la prop title como un string
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#656CEE',
    alignItems: 'center',
    paddingVertical: '5%',
    width: '100%',
    height: height * 0.10,
    position: 'absolute',
    top: 0,
    zIndex: 0,
    borderColor: '#656CEE',
    borderWidth: 0.3,
    shadowColor: '#8B91FC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22.83,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
