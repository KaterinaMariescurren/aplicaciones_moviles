import * as React from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { HERE_MAPS_KEY } from '@env';

export default function App() {
    const [origin, setOrigin] = React.useState({
        latitude:-34.870930, 
        longitude:-58.045802
    })

    const [destination, setDestination] = React.useState({
        latitude:-34.869302, 
        longitude:-58.044654
    })

    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map} 
            
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
            >

                <Marker 
                    draggable //esto hace que podamos mover el pin
                    coordinate={origin}
                    onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)} //aca nos da las coordenadas de donde lo movio
                />

                <Marker 
                    draggable //esto hace que podamos mover el pin
                    coordinate={destination}
                    onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)} //aca nos da las coordenadas de donde lo movio
                />
                
                
                {/* Hace el recorrido de un punto al otro */}

                {/* <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={HERE_MAPS_KEY}
                    strokeColor='#656CEE'
                    strokeWidth={6}
                
                ></MapViewDirections> */}


            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
