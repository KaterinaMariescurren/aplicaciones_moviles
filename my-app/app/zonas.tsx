// app/(map)/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, Alert} from 'react-native';
import * as Location from 'expo-location';
import { markers } from '@/assets/markers';
import polygonsData from '../assets/poligono.json';

export default function Zonas() {
    const mapRef = useRef <MapView>();
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [showPolygons, setShowPolygons] = useState(true);
    const [showMarker, setShowMarker] = useState(false);

    useEffect(() => {
            
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setHasLocationPermission(status === 'granted');
    
            if (status === 'granted') {
                const userLocation = await Location.getCurrentPositionAsync({});
                const region = {
                    latitude:-34.871028, 
                    longitude:-58.045958,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };
                mapRef.current?.animateToRegion(region, 1000);
            }
        })();
    }, []);

    // Convertir coordenadas de GeoJSON a formato compatible con Polygon
    const convertCoordinates = (coordinates: number[][][]) => {
        return coordinates[0].map(([longitude, latitude]) => ({
            latitude,
            longitude,
        }));
    };

    const handlePolygonPress = (index: number) => {
        const message = `
        🕖 De 07:00 a 10:00 hs: 
        💲 Precio por hora: $150
        
        🕙 De 10:00 a 14:00 hs: 
        💲 Precio por hora: $200
        
        🕒 De 14:00 a 18:00 hs: 
        💲 Precio por hora: $250
    `;
        Alert.alert("Precios por franja horaria", message, [{ text: "Cerrar" }],{ cancelable: true });
    };

    return(
        <View style={{ flex: 1 }}>
            <MapView 
            style={StyleSheet.absoluteFill}
            provider={Platform.OS === 'android' ? 'google' : undefined}
            showsUserLocation={hasLocationPermission} //Ubicacion del Usuario
            ref={mapRef} >

                {/* Renderizar el marcador solo si showMarker es verdadero  */}
                {showMarker && markers.map((marker, index) => (
                    <Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}>
                        <Image source={require('../assets/images/icon/noun-store-location-1362338.png')} style={{ width: 30, height: 50, tintColor: '#FF4500' }} />
                        <Callout>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{marker.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}

                {/* Renderizar polígonos solo si `showPolygons` es verdadero */}
                {showPolygons && polygonsData.features.map((feature, index) => (
                    <Polygon
                        key={index} 
                        coordinates={convertCoordinates(feature.geometry.coordinates)}
                        strokeColor="#FF4500" 
                        fillColor="rgba(255, 69, 0, 0.3)" 
                        strokeWidth={1} 
                        tappable 
                        onPress={() => handlePolygonPress(index)} 
                    />
                ))}
            </MapView>

            {/* Botones para alternar visibilidad de polígonos y marcador */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setShowPolygons(!showPolygons)}>
                    <Text style={styles.buttonText}>{showPolygons ? "Ocultar Zona de estacionamiento" : "Mostrar Zona de estacionamiento"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setShowMarker(!showMarker)}>
                    <Text style={styles.buttonText}>{showMarker ? "Ocultar Punto de carga" : "Mostrar Punto de carga"}</Text>
                </TouchableOpacity>
            </View>

            {/* Mensaje de permiso si la ubicación no está permitida */}
            {!hasLocationPermission && (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>Se necesita permiso para acceder a la ubicación.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    permissionContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    permissionText: {
        textAlign: 'center',
        margin: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        gap: 10, 
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
    calloutContainer: {
        width: 150, 
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 2, 
    },
    calloutText: {
        fontSize: 18,
        textAlign: 'center', 
    }, 
});

