import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '@/components/CustomButtom';
import CustomHeader from '@/components/CustomHeader';
import CustomCarList from '@/components/CustomCarList';
import CustomHistoryList from '@/components/CustomHistoryList';
import CustomDespegable from '@/components/CustomDespegable';
import CustomEstacList from '@/components/CustomEstacList';

const { height } = Dimensions.get('window');

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const openBottomEstacionar = () => setBottomSheetVisible(true);
    const closeBottomEstacionar = () => setBottomSheetVisible(false);

    const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    };

    const currentDate = new Date();

    const formatDate = (date: Date): string => {
    const day = date.getDate();
    const monthNames: string[] = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const month = monthNames[date.getMonth()];
    return `${day} de ${month}`;
    };

    const formatTime = (date: Date): string => {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const formattedHours: string = String(hours).padStart(2, '0');
    const formattedMinutes: string = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} hs`;
    };

    const formattedDate: string = formatDate(currentDate);
    const formattedTime: string = formatTime(currentDate);

    return (
    <View style={styles.container}>
        <ScrollView>
        <CustomHeader title='inicio'></CustomHeader>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/imagen-inicio.png')} resizeMode="contain" style={styles.image} />
            </View>
            {/* Tarjeta */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Hola!</Text>
                <Text style={styles.cardContent}>
                ¿Quieres cargar un estacionamiento?
                </Text>
                <CustomButton title='Sí' onPress={openBottomEstacionar} style={{ width: '100%' }} />
            </View>
            <CustomCarList />
            <CustomEstacList navigation={navigation} />
            <View style={styles.card}>
                <Text style={styles.cardContent}>¿Quieres ver la zona de estacionamiento medido y puntos de carga?</Text>
                <CustomButton title='Sí' onPress={() => alert('Botón "Sí" presionado!')} style={{ width: '100%' }} />
            </View>
            <View style={styles.cardHistory}>
                <CustomHistoryList />
            </View>
            <CustomDespegable visible={isBottomSheetVisible} onClose={closeBottomEstacionar} title="Estacionamiento Medido" heightPercentage={0.75}>
                <CustomCarList />
                <View style={styles.containerDespegable}>
                <Text style={styles.listText}>Día y Horario:</Text>
                <View style={styles.containerDia_Horario}>
                    <View style={styles.itemDia}>
                    <Image source={require('../../assets/images/calendario.png')} resizeMode="contain" style={styles.calendario} />
                    <Text style={styles.textDia_Horario}>{formattedDate}</Text>
                    </View>
                    <View style={styles.itemHorario}>
                    <Image source={require('../../assets/images/clock-outline.png')} resizeMode="contain" style={styles.calendario} />
                    <Text style={styles.textDia_Horario}>{formattedTime}</Text>
                    </View>
                </View>
                <Text style={styles.listText}>Dirección:</Text>
                <View style={styles.containerDia_Horario}>
                    <View style={styles.itemDia}>
                    <Image source={require('../../assets/images/map-pointer.png')} resizeMode="contain" style={styles.calendario} />
                    <Text style={styles.textDia_Horario}>15 y 155</Text>
                    </View>
                </View>
                <View style={styles.containerBox}>
                    <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxChange}>
                    <View style={[styles.checkbox, isChecked && styles.checked]} />
                    <Text style={styles.label}>Notificarme cada 1 hs</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton title='Empezar' onPress={openBottomEstacionar} style={{ paddingVertical: 10 }} />
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
    paddingHorizontal:25,
    marginBottom:16
    },
    containerDia_Horario:{
    flexDirection: 'row',
    height:'20%',
    marginBottom:16
    },
    itemDia: {
    width: '60%',
    height:'70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight:10,
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
    itemHorario: {
    width: '40%',
    height:'70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight:10,
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
    },
    textDia_Horario:{
    color:'#656CEE',
    fontSize:15.81
    },
    listText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:5,
    color:'#203D65'
    },
    containerBox: {
    flex: 1,
    },
    checkboxContainer: {
    flexDirection: 'row',
    justifyContent:'center'
    },
    checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#656CEE',
    borderRadius: 4,
    marginRight: 10, // Espacio entre el checkbox y el texto
    backgroundColor: 'white', // Color de fondo del checkbox
    },
    checked: {
    backgroundColor: '#656CEE', // Color de fondo cuando está seleccionado
    },
    label: {
    fontSize: 20,
    color: '#203D65', // Color del texto
    },
});

export default Home;