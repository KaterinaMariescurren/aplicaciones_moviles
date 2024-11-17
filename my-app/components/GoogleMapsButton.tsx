import React, { useEffect, useState } from 'react';
import { Alert, Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

interface GoogleMapsRedirectButtonProps {
    estacionamientoLatitude: number;
    estacionamientoLongitude: number;
}

const GoogleMapsRedirectButton: React.FC<GoogleMapsRedirectButtonProps> = ({
    estacionamientoLatitude, estacionamientoLongitude, }) => {

    const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'No podemos obtener tu ubicación.');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        })();
    }, []);

    // Función para abrir Google Maps con las coordenadas de origen y destino
    const openGoogleMaps = () => {
        if (!userLocation) {
            Alert.alert('Error', 'No se pudo obtener la ubicación del usuario.');
            return;
        }

        // Usamos las coordenadas del estacionamiento como destino
        const destination = {
            latitude: estacionamientoLatitude,
            longitude: estacionamientoLongitude,
        };

        // Crear la URL para Google Maps
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=walking`;

        // Intentamos abrir la URL en Google Maps
        Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'No se pudo abrir Google Maps.')
        );
    };

    return (
        <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
            <Text style={styles.buttonText}>¿Cómo Llegar a mi Auto?</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default GoogleMapsRedirectButton;
