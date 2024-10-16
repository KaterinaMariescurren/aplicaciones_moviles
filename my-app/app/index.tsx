import CustomButton from '@/components/CustomButtom';
import CustomHeader from '@/components/CustomHeader';
import CustomCarList from '@/components/CustomCarList';
import CustomEstacList from '@/components/CustomEstacList';
import CustomHistoryList from '@/components/CustomHistoryList';

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import CustomDespegable from '@/components/CustomDespegable';

const { width, height } = Dimensions.get('window');

export default function App() {

  const handlePressSi = () => {
    alert('Botón "Sí" presionado!');
    // Aquí puedes añadir la lógica adicional que necesites
  };

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomEstacionar = () => setBottomSheetVisible(true);
  const closeBottomEstacionar = () => setBottomSheetVisible(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <CustomHeader title='Inicio' />
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/imagen-inicio.png')} resizeMode="contain" style={styles.image} />
        </View>
        {/* Tarjeta */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hola!</Text>
          <Text style={styles.cardContent}>
            ¿Queres cargar un estacionamiento?
          </Text>
          <CustomButton title='Si' onPress={openBottomEstacionar} style={{ width: '100%' }} />
        </View>
        <CustomCarList></CustomCarList>
        <CustomEstacList></CustomEstacList>
        <View style={styles.card}>
          <Text style={styles.cardContent}>¿Queres ver la zona de estacionamiento medido y puntos de cargas?</Text>
          <CustomButton title='Si' onPress={handlePressSi} style={{width: '100%' }}></CustomButton>
        </View>
        <View style={styles.cardHistory}>
          <CustomHistoryList></CustomHistoryList>
        </View>
        <CustomDespegable visible={isBottomSheetVisible} onClose={closeBottomEstacionar} title="Estacionamiento Medido" heightPercentage={0.75}>
        <View style={styles.containerDespegable}>
          <CustomCarList></CustomCarList>
          <View>
            <Text>Dia y Horario:</Text>
            <View style={styles.item}>
              <Image source={require('../assets/images/calendario.png')} resizeMode="contain" style={styles.calendario}></Image>
              <Text style={styles.textDia_Horario}>22 de Abril</Text>
            </View>
          </View>
          <CustomButton title="Agregar" onPress={handlePressSi} style={{marginVertical:30, height:'35%',}}></CustomButton>
        </View>
      </CustomDespegable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
  },
  imageContainer: {
    width: '60%',
    height: 200, // Altura fija para asegurar que ocupe espacio en la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: height * 0.07,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    height: 150, // Altura fija para asegurar el desplazamiento
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 22.8,
    marginBottom:26,
    borderRadius: 24,
    borderColor: '#656CEE',
    borderWidth: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 4,
    shadowColor: '#8B91FC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 24,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  cardHistory: {
    backgroundColor: '#fff',
    width: '90%',
    height: height*0.40, // Altura fija para asegurar el desplazamiento
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 22.8,
    marginBottom:26,
    borderRadius: 24,
    borderColor: '#656CEE',
    borderWidth: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 4,
    shadowColor: '#8B91FC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 24,
  },
  containerDespegable: {
    flex: 1,
    padding: 20,
  },
  item: {
    width: '50%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16.94,
    borderWidth: 0.3,
    borderColor: '#656CEE',
    shadowColor: '#8B91FC1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  calendario:{
    width: 20,
    height: 20,
    marginRight:10,
    marginTop:8,
  },
  textDia_Horario:{

  },
});
