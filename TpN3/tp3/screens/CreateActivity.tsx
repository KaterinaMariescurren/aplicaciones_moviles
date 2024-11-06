import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { useActivityContext } from '../context/ActivityContext';
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateActivity() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [importance, setImportance] = useState('Medium');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const { addActivity } = useActivityContext();
    const navigation = useNavigation();

    const scheme = useColorScheme();
    const currentColors = Colors[scheme === 'dark' ? 'dark' : 'light'];

    // Maneja la selección de la fecha
    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);
        setDate(currentDate.toISOString().split('T')[0]);  // Establecer solo la fecha
    };

    // Maneja la selección de la hora
    const handleTimeChange = (event: any, selectedTime?: Date) => {
        const currentTime = selectedTime || new Date();
        setShowTimePicker(false);
        setTime(currentTime.toTimeString().split(' ')[0]);  // Establecer solo la hora
    };

    const handleSubmit = () => {
        addActivity({ title, description, importance, date, time, id: Date.now().toString(), completed: false });
        navigation.goBack(); // Vuelve a HabitList después de crear la actividad
    };

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            <Text style={[styles.label, { color: currentColors.text }]}>Título de la Actividad</Text>
            <TextInput
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]}
                value={title}
                onChangeText={setTitle}
                placeholder="Título"
                placeholderTextColor={currentColors.text}
            />
            <Text style={[styles.label, { color: currentColors.text }]}>Descripción (opcional)</Text>
            <TextInput
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Descripción"
                placeholderTextColor={currentColors.text}
            />
            <Text style={[styles.label, { color: currentColors.text }]}>Fecha</Text>
            <TouchableOpacity
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={{ color: currentColors.text }}>{date || "Selecciona una fecha"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Text style={[styles.label, { color: currentColors.text }]}>Hora</Text>
            <TouchableOpacity
                style={[styles.input, { backgroundColor: currentColors.inputBackground }]}
                onPress={() => setShowTimePicker(true)}
            >
                <Text style={{ color: currentColors.text }}>{time || "Selecciona una hora"}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
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
        justifyContent: 'center',
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
