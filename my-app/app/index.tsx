import CustomButton from '@/components/CustomButtom';
import CustomHeader from '@/components/CustomHeader';
import CustomCarList from '@/components/CustomCarList';
import CustomEstacList from '@/components/CustomEstacList';


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
        <CustomButton title='Si' style={{width:'100%',paddingVertical:13,}}></CustomButton>      
      </View>
      <CustomCarList></CustomCarList>
      <CustomEstacList></CustomEstacList>
      <View style={styles.footer}>
        <Text style={styles.footerContent}>¿Queres ver la zona de estacionamiento medido y puntos de cargas?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  imageContainer: {
    width: '70%', // Ancho del contenedor
    height: '20%', // Ajusta la altura según sea necesario
    justifyContent: 'center', // Centra la imagen
    alignItems: 'center', // Centra la imagen
    marginTop: height*0.10, // Espacio superior para separar del encabezado
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
    height:'20%',
    alignSelf: 'center', 
    justifyContent: 'center', 
    padding: 22.8,
    marginVertical:26,
    borderRadius: 24,
    borderColor:'#656CEE',
    shadowColor: '#8B91FC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 24,
  },
  cardContent: {
    textAlign: 'center', 
    fontSize: normalize(14),
    color: '#333',
    marginBottom: normalize(20),
  },
  cardTitle: {
    textAlign: 'center', 
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: normalize(10),
  },
  footer: {
    height:'10%',
    width:'95%',
    alignSelf: 'center', 
    justifyContent: 'center',  
    position: 'absolute',
    bottom: 0, // Pega el contenedor al fondo de la pantalla
    padding:'2.5%',
    backgroundColor: '#fff',
    borderColor:'#656CEE',
    borderWidth:0.3,
    shadowColor: '#8B91FC',
    borderTopLeftRadius: 20, // Radio de esquina inferior izquierda
    borderTopRightRadius: 20, // Radio de esquina inferior derecha
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerContent: {
    textAlign: 'center', 
    fontSize: 20,
    color: '#333',
  },
});
