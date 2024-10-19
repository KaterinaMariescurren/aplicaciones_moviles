import { Stack, Slot } from 'expo-router';

export default function RootLayout() {
  return (

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
        headerTitle:"Ubicacion"
      }} />
      <Stack.Screen 
      name="zonas"
      options={{
        headerTitle:"Zonas y Puntos de Carga"
      }} />
    </Stack>
  );
}
