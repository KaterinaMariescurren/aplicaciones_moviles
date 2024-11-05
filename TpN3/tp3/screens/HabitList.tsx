// screens/HabitList.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import {  useNavigation } from "@react-navigation/native";
import { Colors } from '../constants/Colors';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActivityContext } from '../context/ActivityContext';

type HabitListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HabitList'>;

const HabitList: React.FC = () => { // Añadido tipo React.FC
    const navigation = useNavigation<HabitListScreenNavigationProp>();
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const scheme = useColorScheme();
    const { activities } = useActivityContext();
    const currentColors = Colors[scheme === 'dark' ? 'dark' : 'light'];

    const handleFilterPress = (filter: string) => {
        setActiveFilter(filter);
    };

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.welcome, { color: currentColors.text }]}>Bienvenido a</Text>
                <Text style={[styles.userName, { color: currentColors.text }]}>ToDo</Text>

                <FlatList
    data={activities}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        <View style={[styles.activityItem, { backgroundColor: currentColors.inputBackground }]}>
            <Text style={[styles.activityTitle, { color: currentColors.text }]}>{item.title}</Text>
            <Text style={[styles.activityDescription, { color: currentColors.secondaryText }]}>{item.description}</Text>
            <Text style={[styles.activityDate, { color: currentColors.secondaryText }]}>{item.date}</Text>
            <Text style={[styles.activityTime, { color: currentColors.secondaryText }]}>{item.time}</Text>
        </View>
    )}
    contentContainerStyle={styles.listContainer}
/>

            </View>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("CreateActivity")}>
                    <View style={[styles.addButton, { backgroundColor: currentColors.primaryButton }]}>
                        <Text style={[styles.addButtonText, { color: currentColors.buttonText }]}>+</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.text, { color: currentColors.secondaryText }]}>Agregar una Actividad</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    welcome: {
        fontSize: 18,
        marginTop: 20,
        alignContent: 'center'
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filters: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    activeFilter: {
        backgroundColor: Colors.light.filterActiveBackground, // Usar el color de fondo activo
    },
    addButtonContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    addButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 24,
    },
    text: {
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
    },
    listContainer: {
        paddingBottom: 20,
    },
    activityItem: {
        backgroundColor: Colors.light.inputBackground, // Color de fondo dinámico
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    activityDescription: {
        fontSize: 14,
        marginBottom: 4,
    },
    activityDate: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    activityTime: {
        fontSize: 12,
        fontStyle: 'italic',
    },
});
export default HabitList;
