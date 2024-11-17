import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert } from 'react-native';
import CustomButton from '@/components/CustomButtom';
import CustomCarList from '@/components/CustomCarList';
import CustomHistoryList from '@/components/CustomHistoryList';
import CustomEstacList from '@/components/CustomEstacList';
import { useFocusEffect, useRouter } from 'expo-router';
import { AutoDataBase, EstacionamientoDataBase, useDatabase } from './database/useDatabase';
import * as FileSystem from 'expo-file-system';
import { programarNotificacionesDiarias, registerForPushNotificationsAsync } from './notificaciones/notificaciones';

const { height } = Dimensions.get('window');

const InicioScreen = () => {
    const router = useRouter();
    const database = useDatabase()

    const [autos, setAutos ] = useState<AutoDataBase[]>([])
    const [estacionamientosActivos, setEstacionamientosActivos] = useState<EstacionamientoDataBase[]>([]); // Estacionamientos activos
    const [estacionamientosNoActivos, setEstacionamientosNoActivos] =useState<EstacionamientoDataBase[]>([]);

    const handlePress = () => {
        router.push('/zonas'); // Redirige a la pantalla indicada
    };

    const handlePressEstacionamiento = () => {
        const fecha = new Date();
        const hora = fecha.getHours(); // Obtiene la hora actual en formato 24 horas
        if (hora >= 20){
            Alert.alert(
                "Información importante",
                "Desde las (20:00 hs o más tarde) no hay disponibilidad de estacionamiento medido.",
                [
                    { text: "Entendido" },
                    { text: "Más Información", onPress: () => router.push('/zonas') }
                ],
                { cancelable: true }
            );        }else{
            router.push('/carga_estacionamiento'); // Redirige a la pantalla indicada
        }
    };

    async function listAuto() {
        try {
        const response = await (await database).listAuto();
        if (response) {
            setAutos(response);
        }
        } catch (error) {
        console.log(error);
        }
    }

    async function listEstacionamientosActivos() {
        try{
            const response = await (await database).listEstacionamientosActivos();
            if (response) {
                setEstacionamientosActivos(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function listEstacionamientosNoActivos() {
        try{
            const response = await (await database).listEstacionamientosNoActivos();
            if (response) {
                setEstacionamientosNoActivos(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function eliminarBaseDeDatos() {
        const databaseFilePath = `${FileSystem.documentDirectory}SQLite/medidoCityBell.db`; // Ajusta el nombre a tu base de datos
    
        try {
            await FileSystem.deleteAsync(databaseFilePath);
            console.log("Base de datos eliminada correctamente");
        } catch (error) {
            console.error("Error al eliminar la base de datos:", error);
        }
    }

    // useEffect para programar las notificaciones y registrar la tarea en segundo plano
    useEffect(() => {

        registerForPushNotificationsAsync();

        // Programar las notificaciones al iniciar la app
        programarNotificacionesDiarias();

    }, []);

    useFocusEffect(
        useCallback(() => {
            console.log('Actualizando datos en InicioScreen...');
            listAuto();
            listEstacionamientosActivos();
            listEstacionamientosNoActivos();
        }, [])
    );

    const addAuto = (newAuto: AutoDataBase) => {
        setAutos((prevAutos: any) => [...prevAutos, newAuto]);
    };

    // En InicioScreen
    const eliminarAutoDesdeLista = (id: number) => {
        setAutos((prevAutos) => prevAutos.filter((auto) => auto.id !== id));
        setEstacionamientosActivos((prevEstacionamientoActivo) => prevEstacionamientoActivo.filter((estacionamientoActivo) => estacionamientoActivo.auto_id !== id));
        setEstacionamientosNoActivos((EstacionamientosNoActivos) => EstacionamientosNoActivos.filter((EstacionamientosNoActivos) => EstacionamientosNoActivos.auto_id !== id));
    };

    // Función para manejar la selección de un auto
    const handleSelectAuto = (id: number) => {
        
    };

    return (
    <View style={styles.container}>
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/imagen-inicio.png')} resizeMode="contain" style={styles.image} />
            </View>
            {/* Tarjeta */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Hola!</Text>
                <Text style={styles.cardContent}>
                ¿Quieres cargar un estacionamiento?
                </Text>
                <CustomButton title='Sí' onPress={handlePressEstacionamiento} style={{ width: '100%' }} />
            </View>
            <CustomCarList autos={autos} addAuto={addAuto} eliminarAutoDesdeLista={eliminarAutoDesdeLista} mode='popup' onSelectAuto={handleSelectAuto}/>
            <CustomEstacList estacionamientos={estacionamientosActivos}/>
            <View style={styles.card}>
                <Text style={styles.cardContent}>¿Quieres ver la zona de estacionamiento medido y puntos de carga?</Text>
            <CustomButton title='Sí' onPress={handlePress} style={{ width: '100%' }} /> 
            </View>
            <View style={styles.cardHistory}>
                <CustomHistoryList estacionamientos={estacionamientosNoActivos}/>
            </View>
        </ScrollView>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
    },
    imageContainer: {
    width: '70%',
    height: 200, // Altura fija para asegurar que ocupe espacio en la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: height*0.01,
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
    containerDireccion:{
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

export default InicioScreen;
