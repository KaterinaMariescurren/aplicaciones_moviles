import React, { useState } from 'react';
import { View, Button, Alert, BackHandler } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as turf from '@turf/turf';
import polygonData from '@/assets/poligono.json'; // Importa el archivo JSON
import { useFocusEffect, useRouter } from 'expo-router';

type Location = {
  latitude: number;
  longitude: number;
};

type MapPressEvent = {
  nativeEvent: {
    coordinate: Location;
  };
};

// Función para convertir coordenadas de GeoJSON a formato compatible con Polygon
const convertCoordinates = (coordinates: number[][][]) => {
  return coordinates[0].map(([longitude, latitude]) => ({
    latitude,
    longitude,
  }));
};

const CheckLocationInPolygonScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const router = useRouter(); // Usamos el hook de router

  // Convertimos las coordenadas de todos los polígonos del archivo JSON
  const polygonsCoords = polygonData.features.map((feature: any) =>
    convertCoordinates(feature.geometry.coordinates)
  );

  // Extraemos los polígonos 9 y 4 para realizar la diferencia
  const polygon9Coords = polygonsCoords[9].map(coord => [coord.longitude, coord.latitude]);
  const polygon4Coords = polygonsCoords[4].map(coord => [coord.longitude, coord.latitude]);

  // Creamos los dos polígonos usando Turf
  const polygon9 = turf.polygon([polygon9Coords]);
  const polygon4 = turf.polygon([polygon4Coords]);

  // Calculamos la diferencia entre los polígonos 9 y 4 (el área entre ellos)
  const differencePolygon = turf.difference(turf.featureCollection([polygon4,polygon9])); // Este es el polígono entre los dos

  // Si la diferencia es nula, no mostramos nada
  const differencePolygonCoords = differencePolygon
    ? differencePolygon.geometry.coordinates[0].map(([longitude, latitude]) => ({
        latitude,
        longitude,
      }))
    : [];

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const location = { latitude, longitude };

    // Verificar si la ubicación está dentro de cualquier polígono EXCEPTO los dos (9 y 4)
    const isInsideAnyPolygon = polygonsCoords.some((polygonCoords, index) => {
      // Excluir los polígonos en las posiciones 9 y 4
      if (index === 9 || index === 4) return false;

      const polygon = turf.polygon([polygonCoords.map(coord => [coord.longitude, coord.latitude])]);
      const point = turf.point([longitude, latitude]);
      return turf.booleanPointInPolygon(point, polygon); // Verifica si el punto está dentro de este polígono
    });

    // Verificar si la ubicación está dentro del área entre los dos polígonos (la diferencia)
    const isInsideDifference = checkIfLocationInBetweenPolygons(location);

    if (isInsideAnyPolygon || isInsideDifference) {
      // Solo actualizar la ubicación si está dentro de un polígono válido (excepto los dos específicos)
      setSelectedLocation(location);
    } else {
      // Mostrar un mensaje si está fuera de los polígonos o fuera del área entre los dos
      Alert.alert("En esta zona no hay estacionamiento medido");
    }
  };

  // Función para verificar si la ubicación está dentro del área entre los dos polígonos
  const checkIfLocationInBetweenPolygons = (location: Location) => {
    const point = turf.point([location.longitude, location.latitude]);

    // Verificar si el punto está dentro de la diferencia entre los dos polígonos
    return differencePolygon && turf.booleanPointInPolygon(point, differencePolygon);
  };

  const handleGoBack = () => {
    if (selectedLocation) {
      // Al regresar, pasamos la ubicación seleccionada a la pantalla anterior
      router.back();
      // También pasamos la ubicación a través de params
      router.push({
        pathname: '/',
        params: {
          ubicacion: JSON.stringify(selectedLocation), // Pasamos la ubicación como string
        },
      });
    }
  };

  // Detectar cuando el usuario presiona el botón de retroceso
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Redirigir con el parámetro `fromLocationScreen=true`
        router.push({
          pathname: '/', // La pantalla a la que vamos (en este caso la pantalla principal)
          params: {
            fromLocationScreen: 'true', // Indicamos que venimos desde la pantalla de ubicación
          },
        });
        return true; // Prevenir el comportamiento por defecto (ir hacia atrás sin control)
      };

      // Agregar el listener para el retroceso
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Limpiar el listener cuando la pantalla pierda el foco
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -34.86616076840948,
          longitude: -58.04242651239127,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress} // Llamamos a la función de verificación cuando el mapa es tocado
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Ubicación seleccionada" />
        )}

        {/* Renderizar todos los polígonos excepto los que están en las posiciones 9 y 4 */}
        {polygonsCoords.map((polygonCoords, index) => (
          (index !== 9 && index !== 4) && (
            <Polygon
              key={index}
              coordinates={polygonCoords}
              strokeColor="#FF0000"
              fillColor="rgba(255,0,0,0.3)"
              strokeWidth={2}
            />
          )
        ))}

        {/* Mostrar el polígono de la diferencia entre los dos */}
        {differencePolygonCoords.length > 0 && (
          <Polygon
            coordinates={differencePolygonCoords}
            strokeColor="#FF0000"
            fillColor="rgba(255,0,0,0.3)"
            strokeWidth={2}
          />
        )}
      </MapView>

      {/* Mostrar el botón solo si hay una ubicación seleccionada */}
      {selectedLocation && (
        <Button title="Volver" onPress={handleGoBack} />
      )}
    </View>
  );
};

export default CheckLocationInPolygonScreen;
