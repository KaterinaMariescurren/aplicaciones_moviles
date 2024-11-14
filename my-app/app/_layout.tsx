import { Stack, router } from 'expo-router';
import { LocationProvider } from './LocationContex';

export default function RootLayout() {
  return (
    <LocationProvider>
      <Stack
      screenOptions={{
        orientation:'portrait',
        statusBarColor:'#656CEE',
        headerStyle:{
          backgroundColor:'#656CEE'
        },
        headerTitleAlign:'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22.83,
        },
      }}>
        <Stack.Screen 
        name="index"
        options={{
          headerTitle:"Inicio",
          headerBackVisible:false,
        }} />
        <Stack.Screen 
        name="ubicacion"
        options={{
          headerTitle:"Ubicacion",
        }} />
        <Stack.Screen 
        name="mapa"
        options={{
          headerTitle:"Mapa"
        }} />
        <Stack.Screen 
        name="zonas"
        options={{
          headerTitle:"CityBell"
        }} />
        <Stack.Screen 
        name="carga_estacionamiento"
        options={{
          headerTitle:"Cargar estacionamiento"
        }} />
      </Stack>
    </LocationProvider>
  );
}
