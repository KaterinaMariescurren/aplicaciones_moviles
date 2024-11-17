import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, Linking, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEstacionamiento } from './EstacionamientoContext';
import { useDatabase } from '@/app/database/useDatabase';
import MapView, { Marker } from 'react-native-maps';  // Importa MapView y Marker
import GoogleMapsRedirectButton from '@/components/GoogleMapsButton';

const Mapa = () => {
  const router = useRouter();
  const { estacionamientoId } = useEstacionamiento(); // Obtiene el id del estacionamiento desde el contexto
  const database = useDatabase();

  const [estacionamiento, setEstacionamiento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const openSEMApp = async () => {
    const appPackageName = 'ar.edu.unlp.semmobile.laplata'; // Nombre del paquete de SEM
    const playStoreUrl = `https://play.google.com/store/apps/details?id=${appPackageName}`;

    try {
      if (estacionamientoId !== null) {
        const data = await (await database).setActivoToZero(estacionamientoId);
      }

      // Verificar si la app está instalada en el dispositivo
      const isAppInstalled = await Linking.canOpenURL(`package:SEM La Plata`);

      if (isAppInstalled) {
        // Si la app está instalada, abrir SEM
        console.log('SEM está instalada. Abriendo la app...');
        Linking.openURL(`package:${appPackageName}`);

        // Después de abrir la app, espera a que regrese a tu app
        router.push('/');  // Navega a la pantalla principal (index.tsx)
      } else {
        // Si la app no está instalada, redirigir a la Play Store
        console.log('SEM no está instalada. Redirigiendo a la Play Store...');
        Linking.openURL(playStoreUrl);
        Alert.alert('App no instalada', 'Redirigiendo a la Play Store...');
      }
    } catch (error) {
      console.error('Error al intentar abrir SEM:', error);
      Alert.alert('Error', 'Hubo un problema al intentar abrir la app.');
    }
  };


  useEffect(() => {
    const fetchEstacionamiento = async () => {
      try {
        if (estacionamientoId !== null) { // Verificación explícita de que estacionamientoId no es null
          // Obtener datos del estacionamiento por ID
          const data = await (await database).getEstacionamientoById(estacionamientoId);
          setEstacionamiento(data);
        } else {
          Alert.alert('Error', 'No se ha encontrado un estacionamiento seleccionado.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener estacionamiento:', error);
        setLoading(false);
        Alert.alert('Error', 'No se pudo obtener la información del estacionamiento');
      }
    };

    fetchEstacionamiento();  // Llamada a la función de carga siempre que el componente se monte
  }, [estacionamientoId]);  // Ejecutar cuando cambie estacionamientoId

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Verificar si estacionamiento es null antes de mostrar
  if (!estacionamiento) {
    return <Text>No se encontró el estacionamiento.</Text>;
  }


  return (
    <View style={styles.container}>

      {/* MapView para mostrar el mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: estacionamiento.latitude, // Latitud del estacionamiento
          longitude: estacionamiento.longitude, // Longitud del estacionamiento
          latitudeDelta: 0.001, // Zoom en el mapa
          longitudeDelta: 0.001, // Zoom en el mapa
        }}
      >
        {/* Marker para indicar la ubicación del estacionamiento */}
        <Marker
          coordinate={{
            latitude: estacionamiento.latitude,
            longitude: estacionamiento.longitude,
          }}
          title={`Estacionamiento ${estacionamiento.id}`}
          description={estacionamiento.ubicacion}
        />
      </MapView>

      {/* Botón Finalizar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openSEMApp}>
          <Text style={styles.buttonText}>Finalizar estacionamiento</Text>
        </TouchableOpacity>
        <GoogleMapsRedirectButton
          estacionamientoLatitude={estacionamiento.latitude}
          estacionamientoLongitude={estacionamiento.longitude} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',    // Asegura que el botón se posicione correctamente en la pantalla
    bottom: 30,              // Distancia desde la parte inferior de la pantalla
    left: 20,                // Margen desde el borde izquierdo
    right: 20,               // Margen desde el borde derecho
    paddingHorizontal: 20,   // Asegura que el botón tenga el espacio adecuado
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#656CEE',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default Mapa;
