import React, { useState } from 'react';
import { View, Button } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as turf from '@turf/turf';
import polygonData from '@/assets/poligono.json'; // Importa el archivo JSON

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

  // Convertimos las coordenadas del polígono usando la función
  const polygonCoords: Location[] = convertCoordinates(polygonData.features[0].geometry.coordinates);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const checkIfLocationInPolygon = () => {
    if (!selectedLocation) return;

    const point = turf.point([selectedLocation.longitude, selectedLocation.latitude]);
    const polygon = turf.polygon([polygonCoords.map(coord => [coord.longitude, coord.latitude])]);

    const isInside = turf.booleanPointInPolygon(point, polygon);
    alert(isInside ? "La ubicación está dentro del área permitida." : "La ubicación está fuera del área permitida.");
  };

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
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Ubicación seleccionada"
          />
        )}
        <Polygon
          coordinates={polygonCoords}
          strokeColor="#FF0000"
          fillColor="rgba(255,0,0,0.3)"
          strokeWidth={2}
        />
      </MapView>
      <Button title="Verificar ubicación" onPress={checkIfLocationInPolygon} />
    </View>
  );
};

export default CheckLocationInPolygonScreen;
