// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import CreateActivity from "./screens/CreateActivity";
import HabitList from "./screens/HabitList";
import { ActivityProvider } from "./context/ActivityContext";
import { RootStackParamList } from "./types";
import EditActivity from "./screens/EditActivity";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <ActivityProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="HabitList" component={HabitList} options={{ title: 'Mis Hábitos' }} />
                    <Stack.Screen name="CreateActivity" component={CreateActivity} options={{ title: 'Agregar Hábitos' }} />
                    <Stack.Screen name="EditActivity" component={EditActivity} /> 
                </Stack.Navigator>
            </NavigationContainer>
        </ActivityProvider>
    );
}
