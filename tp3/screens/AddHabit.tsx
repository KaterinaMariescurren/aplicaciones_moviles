// AddHabit.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

type AddHabitScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddHabit'>;

const AddHabit: React.FC = () => {
    const [habitName, setHabitName] = useState('');
    const [importance, setImportance] = useState('Media'); // Ejemplo simple para seleccionar importancia
    const navigation = useNavigation<AddHabitScreenNavigationProp>();

    const handleAddHabit = () => {
        if (!habitName) {
            Alert.alert("Error", "Por favor, ingresa un nombre para el hábito.");
            return;
        }
        // Código para agregar el hábito, podría ser una llamada a la API
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={habitName}
                style={styles.input}
                placeholder="Nombre del hábito"
                onChangeText={(text) => setHabitName(text)}
            />
            {/* Dropdown o botones para seleccionar la importancia (Alta, Media, Baja) */}
            <Button title="Agregar Hábito" onPress={handleAddHabit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 16,
    },
});

export default AddHabit;
