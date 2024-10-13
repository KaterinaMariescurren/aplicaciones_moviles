import CustomButton from '@/components/CustomButtom';
import CustomHeader from '@/components/CustomHeader';
import CustomList from '@/components/CustomList';

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = width / 375; // Escala basada en un ancho de pantalla de referencia

function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

export default function App() {
  return (
    
    <View style={styles.container}>
      <CustomHeader title='Inicio'></CustomHeader>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/imagen-inicio.png')} resizeMode="contain" style={styles.image}></Image>
      </View>
      {/* Tarjeta */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hola!</Text>
        <Text style={styles.cardContent}>
          ¿Queres cargar un estacionamiento?
        </Text>
        <CustomButton title='Si'></CustomButton>      
      </View>
      <CustomList></CustomList>
      <CustomList></CustomList>
      <View style={styles.footer}>
        <Text style={styles.cardContent}>¿Queres ver la zona de estacionamiento medido y puntos de cargas?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: '90%', // Ancho del contenedor
    height: height*0.25, // Ajusta la altura según sea necesario
    justifyContent: 'center', // Centra la imagen
    alignItems: 'center', // Centra la imagen
    marginTop: normalize(75), // Espacio superior para separar del encabezado
    alignSelf: 'center', // Centra el contenedor de la imagen horizontalmente
    overflow: 'hidden', // Asegúrate de que no se corte
  },
  image: {
    width: '100%', // La imagen ocupa el 100% del contenedor
    height: '100%', // La imagen ocupa el 100% del contenedor
    position: 'absolute', // Posiciona la imagen de manera absoluta
  },
  card: {
    backgroundColor: '#fff',
    width:'90%',
    marginVertical: 36,
    padding: 22.8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  footer: {
    backgroundColor: '#fff',
    padding: normalize(10),
    marginHorizontal:7,
    borderTopLeftRadius: 20, // Radio de esquina inferior izquierda
    borderTopRightRadius: 20, // Radio de esquina inferior derecha
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    textAlign: 'center', 
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: normalize(10),
  },
  cardContent: {
    textAlign: 'center', 
    fontSize: normalize(14),
    color: '#333',
    marginBottom: normalize(20),
  },
});
