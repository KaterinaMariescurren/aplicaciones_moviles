import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface CustomButtonProps { 
  title: string;
  onPress: () => void; // Añade la prop onPress
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress, // Desestructuramos onPress
  style
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
          colors={['#FFA500', '#FF4500']} // Colores del gradiente
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, style]}
      >
          <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFBA82', // Color del botón
        justifyContent: 'center', 
        borderRadius: 15,
    },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CustomButton;
