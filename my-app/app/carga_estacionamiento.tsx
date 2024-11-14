import CustomButton from "@/components/CustomButtom";
import CustomCarList from "@/components/CustomCarList";
import { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Alert, View, Text, Image } from "react-native";
import { AutoDataBase, EstacionamientoDataBase, useDatabase } from "./database/useDatabase";
import { getStreetName } from "./APIS/geocodeUtils";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function estacionamiento() {
    const router = useRouter();
    const database = useDatabase()

    // Verificar si `ubicacion` es un arreglo o una cadena
    const [notificar, setNotificar] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selectedAutoId, setSelectedAutoId] = useState<number | null>(null); // ID del auto seleccionado
    const [autos, setAutos ] = useState<AutoDataBase[]>([])


    const fecha = new Date();
    

    // Formatear fecha y hora para su uso
    const formattedDate: string = `${fecha.getDate()} de ${['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][fecha.getMonth()]}`;
    const formattedTime: string = `${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')} hs`;

    const [isChecked, setIsChecked] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loading

    // Usar useLocalSearchParams para obtener la ubicación directamente de la URL
    const { ubicacion } = useLocalSearchParams(); // Usar useLocalSearchParams en lugar de router.params

    // Verificar si ubicacion es un arreglo o una cadena
    const [ubicacionState, setUbicacion] = useState<string>(Array.isArray(ubicacion) ? ubicacion[0] : ubicacion || ""); // Maneja la posible cadena o arreglo

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
                ubicacion: ubicacionState,
                activo: 1,
                notificar,
                auto_id: selectedAutoId,
                latitude: latitude,
                longitude: longitude 
            };
            // Crear estacionamiento en la base de datos
            await (await database).createEstacionamiento(newEstacionamiento);

            // Actualizar la lista de estacionamientos activos
            const updatedEstacionamientos = await(await database).listEstacionamientosActivos();

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'No se pudo crear el estacionamiento.');
        }
    };

    // Función para manejar la selección de un auto
    const handleSelectAuto = (id: number) => {
        setSelectedAutoId(id);
    };

    // Función para manejar el cambio del checkbox de notificación
    const handleCheckboxChange = () => {
        setIsChecked(isChecked === true ? false: true);
        setNotificar(notificar === 0 ? 1 : 0);
    };

    // Obtener la ubicación del usuario
    const getLocation = async (latitude: number, longitude: number) => {
        setIsLoading(true); // Comienza el loading
        try {
            
            // Obtener la dirección a partir de las coordenadas
            const address = await getStreetName(latitude, longitude);
            if (address.height === 'Altura desconocida'){
                setUbicacion(address.street); // Actualiza el estado con la dirección
            }else{
                setUbicacion(address.street + " Nº" + address.height); // Actualiza el estado con la dirección
            }
            setLatitude(latitude);
            setLongitude(longitude);
            setIsLoading(false); // Finaliza el loading
        } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        Alert.alert("Error", "No se pudo obtener la ubicación.");
        setIsLoading(false); // Finaliza el loading en caso de error
        }
    };

    const handlePressUbicacion = () => {
        router.push('/ubicacion'); // Redirige a la pantalla indicada
    };

    const addAuto = (newAuto: AutoDataBase) => {
        setAutos((prevAutos) => [...prevAutos, newAuto]);
    };
    
    useEffect(() => {
        console.log('Autos:');
        listAuto();

        if (ubicacion) {
            const parsedUbicacion = Array.isArray(ubicacion) ? ubicacion[0] : ubicacion;
                const data = JSON.parse(parsedUbicacion);
                getLocation(data.latitude, data.longitude);
        }
    }, []);

    return(
        <View style={styles.container}>
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
                                <Text style={styles.textDia_Horario}>{ubicacionState}</Text>
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
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, // Hace que el contenedor ocupe toda la pantalla
        },
    containerDespegable: {
        flex: 1,
        paddingHorizontal: 25,
        marginBottom: 16,
    },
    containerDia_Horario: {
        flexDirection: 'row',
        height: '20%',
        marginBottom: 16,
    },
    containerDireccion: {
        flexDirection: 'row',
        height: '20%',
        marginBottom: 16,
    },
    itemDia: {
        width: '60%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10,
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
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10,
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
    calendario: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    textDia_Horario: {
        color: '#656CEE',
        fontSize: 15.81,
    },
    listText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#203D65',
    },
    containerBox: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#656CEE',
        borderRadius: 4,
        marginRight: 10,
        backgroundColor: 'white',
    },
    checked: {
        backgroundColor: '#656CEE',
    },
    label: {
        fontSize: 20,
        color: '#203D65',
    },
});

