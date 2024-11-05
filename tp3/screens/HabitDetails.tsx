// HabitDetails.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type HabitDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HabitDetails'>;
type HabitDetailsScreenRouteProp = RouteProp<RootStackParamList, 'HabitDetails'>;

const HabitDetails: React.FC = () => {
    const navigation = useNavigation<HabitDetailsScreenNavigationProp>();
    const route = useRoute<HabitDetailsScreenRouteProp>();
    const { habit } = route.params; // Ejemplo: { name: "Hábito de ejemplo", importance: "Alta" }

    const handleEditHabit = () => {
        // Lógica para editar el hábito
        Alert.alert("Editar", `Editar el hábito: ${habit.name}`);
    };

    const handleDeleteHabit = () => {
        // Lógica para eliminar el hábito
        Alert.alert("Eliminar", `¿Deseas eliminar el hábito: ${habit.name}?`, [
            { text: "Cancelar", style: "cancel" },
            { text: "Eliminar", onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles del Hábito</Text>
            <Text>Nombre: {habit.name}</Text>
            <Text>Importancia: {habit.importance}</Text>
            <Button title="Editar Hábito" onPress={handleEditHabit} />
            <Button title="Eliminar Hábito" onPress={handleDeleteHabit} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default HabitDetails;
