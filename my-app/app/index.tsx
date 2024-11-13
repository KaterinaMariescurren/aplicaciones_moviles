import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import CustomButton from '@/components/CustomButtom';
import CustomCarList from '@/components/CustomCarList';
import CustomHistoryList from '@/components/CustomHistoryList';
import CustomDespegable from '@/components/CustomDespegable';
import CustomEstacList from '@/components/CustomEstacList';
import { useRouter } from 'expo-router';
import { AutoDataBase, EstacionamientoDataBase, useDatabase } from './database/useDatabase';
import * as FileSystem from 'expo-file-system';



const { height } = Dimensions.get('window');

const InicioScreen = () => {
    const router = useRouter();
    const database = useDatabase()

    // Estado para manejar la ubicación y otras variables
    const [ubicacion, setUbicacion] = useState("");
    const [notificar, setNotificar] = useState(0);
    const [selectedAutoId, setSelectedAutoId] = useState<number | null>(null); // ID del auto seleccionado
    const [autos, setAutos ] = useState<AutoDataBase[]>([])
    const [estacionamientosActivos, setEstacionamientosActivos] = useState<EstacionamientoDataBase[]>([]); // Estacionamientos activos
    const [estacionamientosNoActivos, setEstacionamientosNoActivos] =useState<EstacionamientoDataBase[]>([]);

    const fecha = new Date();

    // Formatear fecha y hora para su uso
    const formattedDate: string = `${fecha.getDate()} de ${['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][fecha.getMonth()]}`;
    const formattedTime: string = `${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')} hs`;

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // Función para abrir el despegable de estacionamiento
    const openBottomEstacionar = () => {
        setBottomSheetVisible(true);
        setSelectedAutoId(null); // Restablecer auto seleccionado
        setUbicacion(""); // Restablecer ubicación
    };

    // Función para cerrar el despegable
    const closeBottomEstacionar = () => setBottomSheetVisible(false);

    // Función para manejar la selección de un auto
    const handleSelectAuto = (id: number) => {
        setSelectedAutoId(id);
    };

    // Función para manejar el cambio del checkbox de notificación
    const handleCheckboxChange = () => {
        setIsChecked(true);
        setNotificar(notificar === 0 ? 1 : 0);
    };

    const handlePress = () => {
        router.push('/zonas'); // Redirige a la pantalla indicada
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

    // Función para crear un nuevo estacionamiento
    async function createEstacionamiento() {
        try {
            if (selectedAutoId === null) {
                Alert.alert('Error', 'Selecciona un auto primero.');
                return;
            }
            if (ubicacion === "") {
                Alert.alert('Error', 'Ingresa la ubicación del auto.');
                return;
            }
            console.log('Creando Estacionamiento');
            const newEstacionamiento: EstacionamientoDataBase ={
                id: 0,
                fecha,
                horario: formattedTime,
                ubicacion,
                activo: 1,
                notificar,
                auto_id: selectedAutoId
            };
            // Crear estacionamiento en la base de datos
            await (await database).createEstacionamiento(newEstacionamiento);
            // Actualizar la lista de estacionamientos activos
            const updatedEstacionamientos = await(await database).listEstacionamientosActivos();
            setEstacionamientosActivos(updatedEstacionamientos);
            closeBottomEstacionar();
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'No se pudo crear el estacionamiento.');
        }
    };

    async function eliminarBaseDeDatos() {
        const databaseFilePath = `${FileSystem.documentDirectory}SQLite/medidoCityBell.db`; // Ajusta el nombre a tu base de datos
    
        try {
            await FileSystem.deleteAsync(databaseFilePath);
            console.log("Base de datos eliminada correctamente");
        } catch (error) {
            console.error("Error al eliminar la base de datos:", error);
        }
    }

    useEffect(() => {
        console.log('Autos:');
        listAuto();
        console.log('Estacionamientos:');
        listEstacionamientosActivos();
        console.log("Historial:");
        listEstacionamientosNoActivos();
    }, []);

    const addAuto = (newAuto: AutoDataBase) => {
        setAutos((prevAutos) => [...prevAutos, newAuto]);
    };

    const handlePressUbicacion = () => {
        router.push('/ubicacion'); // Redirige a la pantalla indicada
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
                <CustomButton title='Sí' onPress={openBottomEstacionar} style={{ width: '100%' }} />
            </View>
            <CustomCarList autos={autos} addAuto={addAuto} mode='popup' onSelectAuto={handleSelectAuto}/>
            <CustomEstacList estacionamientos={estacionamientosActivos}/>
            <View style={styles.card}>
                <Text style={styles.cardContent}>¿Quieres ver la zona de estacionamiento medido y puntos de carga?</Text>
            <CustomButton title='Sí' onPress={handlePress} style={{ width: '100%' }} /> 
            </View>
            <View style={styles.cardHistory}>
                <CustomHistoryList estacionamientos={estacionamientosNoActivos}/>
            </View>
            <CustomDespegable visible={isBottomSheetVisible} onClose={closeBottomEstacionar} title="Estacionamiento Medido" heightPercentage={0.75}>
                <CustomCarList autos={autos} addAuto={addAuto} mode='selection' onSelectAuto={handleSelectAuto}/>
                <View style={styles.containerDespegable}>
                <Text style={styles.listText}>Día y Horario:</Text>
                <View style={styles.containerDia_Horario}>
                    <View style={styles.itemDia}>
                    <Image source={require('../assets/images/calendario.png')} resizeMode="contain" style={styles.calendario} />
                    <Text style={styles.textDia_Horario}>{formattedDate}</Text>
                    </View>
                    <View style={styles.itemHorario}>
                    <Image source={require('../assets/images/clock-outline.png')} resizeMode="contain" style={styles.calendario} />
                    <Text style={styles.textDia_Horario}>{formattedTime}</Text>
                    </View>
                </View>
                {/* Campo para ingresar dirección */}
                <Text style={styles.listText}>Dirección:</Text>
                        <View style={styles.containerDireccion}>
                            <View style={styles.itemDia}>
                                <TextInput
                                    style={styles.textDia_Horario}
                                    placeholder="Ingresa la ubicación"
                                    value={ubicacion}
                                    onChangeText={setUbicacion}
                                />
                            </View>
                            <CustomButton title='Ubicacion' onPress={handlePressUbicacion} style={{ height:'70%', marginLeft:25, width:'100%'}}></CustomButton>
                        </View>
                <View style={styles.containerBox}>
                    <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxChange}>
                    <View style={[styles.checkbox, isChecked && styles.checked]} />
                    <Text style={styles.label}>Notificarme cada 1 hs</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton title='Empezar' onPress={createEstacionamiento} style={{ paddingVertical: 10 }} />
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
