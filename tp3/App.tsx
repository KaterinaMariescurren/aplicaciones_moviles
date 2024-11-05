import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import HabitList from "./screens//HabitList";
import AddHabit from "./screens/AddHabit";
import HabitDetails from "./screens/HabitDetails";
import { RootStackParamList } from "./types"; // Importa los tipos

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="HabitList" component={HabitList} options={{ title: 'Mis Hábitos' }} />
                <Stack.Screen name="AddHabit" component={AddHabit} options={{ title: 'Agregar Hábitos' }} />
                <Stack.Screen name="HabitDetails" component={HabitDetails} options={{ title: 'Detalles del Hábito' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}