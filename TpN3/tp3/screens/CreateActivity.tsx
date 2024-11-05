// screens/CreateActivity.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { useActivityContext } from '../context/ActivityContext';
import { useNavigation } from "@react-navigation/native";

export default function CreateActivity() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [importance, setImportance] = useState('Medium');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const { addActivity } = useActivityContext();
    const navigation = useNavigation();

    const scheme = useColorScheme();
    const currentColors = Colors[scheme === 'dark' ? 'dark' : 'light'];

    const handleSubmit = () => {
        addActivity({ title, description, importance, date, time });
        navigation.goBack(); // Vuelve a HabitList después de crear la actividad
    };

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            <Text style={[styles.label, { color: currentColors.text }]}>Título de la Actividad</Text>
            <TextInput
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]} // Usar colores dinámicos
                value={title}
                onChangeText={setTitle}
                placeholder="Título"
                placeholderTextColor={currentColors.text}
            />
            <Text style={[styles.label, { color: currentColors.text }]}>Descripción (opcional)</Text>
            <TextInput
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]} // Usar colores dinámicos
                value={description}
                onChangeText={setDescription}
                placeholder="Descripción"
                placeholderTextColor={currentColors.text}
            />
            <Text style={[styles.label, { color: currentColors.text }]}>Fecha</Text>
            <TextInput
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]} // Usar colores dinámicos
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={currentColors.text}
            />
            <Text style={[styles.label, { color: currentColors.text }]}>Hora</Text>
            <TextInput
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]} // Usar colores dinámicos
                value={time}
                onChangeText={setTime}
                placeholder="HH:MM"
                placeholderTextColor={currentColors.text}
            />
            <TouchableOpacity style={[styles.submitButton, { backgroundColor: currentColors.primaryButton }]} onPress={handleSubmit}>
                <Text style={[styles.submitButtonText, { color: currentColors.buttonText }]}>Crear Actividad</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        marginVertical: 10,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderWidth: 0.2,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    submitButton: {
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
