import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, PixelRatio, Dimensions } from 'react-native';

interface CustomButtonProps {
  title: string;
}

const { width } = Dimensions.get('window');
const scale = width / 375; // Escala basada en un ancho de pantalla de referencia

function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
}) => {
  return (
    <TouchableOpacity  onPress={() => alert('Botón en tarjeta presionado!')}>
        <LinearGradient
            colors={['#FFA500', '#FF4500']} // Colores del gradiente
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFBA82', // Color del botón
        padding: normalize(10),
        borderRadius: 15,
    },
      buttonText: {
        color: '#FFFFFF',
        fontSize: normalize(16),
        textAlign: 'center',
    },
});

export default CustomButton;
