import CustomButton from "@/components/CustomButtom";
import CustomCarList from "@/components/CustomCarList";
import { useEffect, useState } from "react";
import { StyleSheet, Alert, View, Text, Image } from "react-native";
import { AutoDataBase, EstacionamientoDataBase, useDatabase } from "./database/useDatabase";
import { getStreetName } from "./APIS/geocodeUtils";
import { useFocusEffect, useRouter } from "expo-router";
import { useLocation } from './LocationContex';
import React from "react";

export default function estacionamiento() {
  const router = useRouter();
  const database = useDatabase();
  const { location, setLocation } = useLocation(); // Accede a la ubicación del contexto

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectedAutoId, setSelectedAutoId] = useState<number | null>(null); // ID del auto seleccionado
  const [autos, setAutos] = useState<AutoDataBase[]>([])

  const fecha = new Date();

  // Formatear fecha y hora para su uso
  const formattedDate: string = `${fecha.getDate()} de ${['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][fecha.getMonth()]}`;
  const formattedTime: string = `${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')} hs`;

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loading

  const [ubicacionState, setUbicacion] = useState<string>("");

  async function listAutoNoEstacionados() {
    try {
      const response = await (await database).listAutosNoEstacionados();
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
      if (ubicacionState === "") {
        Alert.alert('Error', 'Ingresa la ubicación del auto.');
        return;
      }
      console.log('Creando Estacionamiento');
      const newEstacionamiento: EstacionamientoDataBase = {
        id: 0,
        fecha,
        horario: fecha.getTime(),
        ubicacion: ubicacionState,
        activo: 1,
        auto_id: selectedAutoId,
        latitude: latitude,
        longitude: longitude
      };
      // Crear estacionamiento en la base de datos
      await (await database).createEstacionamiento(newEstacionamiento);

      // Actualizar la lista de estacionamientos activos
      const updatedEstacionamientos = await (await database).listEstacionamientosActivos();

      // Limpia la ubicación después de crear el estacionamiento
      setUbicacion("");
      setLocation(null);

      handleGoBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo crear el estacionamiento.');
    }
  };

  // Función para manejar la selección de un auto
  const handleSelectAuto = (id: number) => {
    setSelectedAutoId(id);
  };


  const handleGoBack = () => {
    router.back(); // Regresa sin enviar datos si no hay ubicación
  };

  useFocusEffect(
    React.useCallback(() => {
      // Código ejecutado al enfocar la pantalla (montar)
      return () => {
        console.log("Limpiando")
        // Limpia ubicacionState cuando la pantalla pierde el foco (desmontar)
        setUbicacion("");
        setLocation(null);
      };
    }, [])
  );

  // Obtener la ubicación del usuario
  const getLocation = async (latitude: number, longitude: number) => {
    setIsLoading(true); // Comienza el loading
    try {

      // Obtener la dirección a partir de las coordenadas
      const address = await getStreetName(latitude, longitude);
      if (address.height === 'Altura desconocida') {
        setUbicacion(address.street); // Actualiza el estado con la dirección
      } else {
        setUbicacion(address.street + " Nº" + address.height); // Actualiza el estado con la dirección
      }
      setIsLoading(false); // Finaliza el loading
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      Alert.alert("Error", "No se pudo obtener la ubicación.");
      setIsLoading(false); // Finaliza el loading en caso de error
    }
  };

  const handlePressUbicacion = () => {
    router.push({
      pathname: '/ubicacion',
      params: {
        redirectBack: "true", // Un indicador para saber que debe volver con datos
      },
    });
  };


  const addAuto = (newAuto: AutoDataBase) => {
    setAutos((prevAutos: any) => [...prevAutos, newAuto]);
  };

  useEffect(() => {
    console.log('Autos:');
    listAutoNoEstacionados();

    if (location) {
      try {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        getLocation(location.latitude, location.longitude);
      } catch (error) {
        console.error("Error al procesar la ubicación:", error);
      }
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {/* Lista personalizada de autos */}
      <CustomCarList
        autos={autos}
        addAuto={addAuto}
        mode="selection"
        onSelectAuto={handleSelectAuto}
      />

      <View style={styles.containerDespegable}>
        {/* Información de Día y Horario */}
        <Text style={styles.listText}>Día y Horario:</Text>
        <View style={styles.containerDia_Horario}>
          {/* Día */}
          <View style={styles.itemDia}>
            <Image
              source={require('../assets/images/calendario.png')}
              resizeMode="contain"
              style={styles.calendario}
            />
            <Text style={styles.textDia_Horario}>{formattedDate}</Text>
          </View>

          {/* Horario */}
          <View style={styles.itemHorario}>
            <Image
              source={require('../assets/images/clock-outline.png')}
              resizeMode="contain"
              style={styles.calendario}
            />
            <Text style={styles.textDia_Horario}>{formattedTime}</Text>
          </View>
        </View>

        {/* Campo para ingresar Dirección */}
        <Text style={styles.listText}>Dirección:</Text>
        <View style={styles.containerDireccion}>
          <View style={styles.itemUbicacion}>
            <Text style={styles.textDia_Horario}>{ubicacionState}</Text>
          </View>
          <CustomButton
            title="Ubicacion"
            onPress={handlePressUbicacion}
            style={{ paddingVertical: 10, marginTop: 40 }}
          />
        </View>

        {/* Botón de Empezar */}
        <CustomButton
          title="Empezar"
          onPress={createEstacionamiento}
          style={{ paddingVertical: 10 }}
        />
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
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  containerDia_Horario: {
    flexDirection: 'row',
    height: '20%',
  },
  containerDireccion: {
    height: '50%',
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
    borderRadius: 17,
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
    borderRadius: 17,
    borderWidth: 0.3,
    borderColor: '#656CEE',
    shadowColor: '#8B91FC1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemUbicacion: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    backgroundColor: '#ffffff',
    borderRadius: 17,
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
    fontSize: 15,
  },
  listText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#203D65',
  },
});


