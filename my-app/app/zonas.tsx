// app/(map)/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from 'expo-router';
import * as Location from 'expo-location';
import { markers } from '@/assets/markers';

export default function Zonas() {
    const mapRef = useRef <MapView>();
    const navigation = useNavigation();
    const [hasLocationPermission, setHasLocationPermission] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight:() => (
                <TouchableOpacity onPress={focusMap}>
                    <View style={{ padding: 10}}>
                        <Text>Zona</Text>
                    </View>
                </TouchableOpacity>
            ),
        });

        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setHasLocationPermission(status === 'granted');
        })();
    }, []);

    //Marcar una zona en esepecifico
    const focusMap = () => {
        const CityBell = {
            latitude:-34.866137, 
            longitude:-58.046823,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };

        mapRef.current?.animateToRegion(CityBell);
    };


    return(
        <View style={{ flex: 1 }}>
            <MapView 
            style={StyleSheet.absoluteFill}
            provider={Platform.OS === 'android' ? 'google' : undefined}
            showsUserLocation={hasLocationPermission} //Ubicacion del Usuario
            ref={mapRef} >
                {/* Marcar puntos de carga*/}
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={marker}>
                        <Image source={require('../assets/images/icon/noun-store-location-1362338.png')} style={{ width: 30, height: 50, tintColor: '#FF4500' }} />
                        <Callout>
                            <View style={{ padding : 10 }}>
                                <Text style={{ fontSize : 24 }}>{marker.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))} 

            </MapView>
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
});

