// HabitList.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Colors } from '../constants/Colors';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActivityContext } from '../context/ActivityContext';

type HabitListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HabitList'>;

const HabitList: React.FC = () => {
    const navigation = useNavigation<HabitListScreenNavigationProp>();
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const scheme = useColorScheme();
    const { activities, markActivityCompleted, removeActivity, editActivity } = useActivityContext();
    const currentColors = Colors[scheme === 'dark' ? 'dark' : 'light'];

    const handleCompletionToggle = (activityId: string) => {
        markActivityCompleted(activityId);
    };

    const handleEditActivity = (activityId: string) => {
        navigation.navigate("EditActivity", { activityId });
    };

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.welcome, { color: currentColors.text }]}>¡Organiza tu día, alcanza tus metas!</Text>
                <Text style={[styles.userName, { color: currentColors.text }]}>¿Listo? Comencemos</Text>

                <FlatList
                    data={activities}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.activityItem, { backgroundColor: currentColors.inputBackground }]}>
                            <View style={styles.activityHeader}>
                                <Text style={[styles.activityTitle, { color: currentColors.text }]}>{item.title}</Text>
                                <TouchableOpacity onPress={() => handleCompletionToggle(item.id)}>
                                    <View style={[styles.completionCircle, { borderColor: item.completed ? '#FF73FA' : currentColors.text }]}>
                                        {item.completed && <View style={[styles.completionCircleFilled, { backgroundColor: '#FF73FA' }]} />}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.activityDescription, { color: currentColors.secondaryText }]}>{item.description}</Text>
                            <Text style={[
                                styles.importance,
                                item.importance === 'Alta' ? styles.highImportance :
                                item.importance === 'Media' ? styles.mediumImportance :
                                styles.lowImportance
                            ]}>
                                Importancia: {item.importance}
                            </Text>
                            <View style={styles.activityDetails}>
                                <Text style={[styles.activityDate, { color: currentColors.secondaryText }]}>{item.date}</Text>
                                <Text style={[styles.activityTime, { color: currentColors.secondaryText }]}>{item.time}</Text>
                            </View>
                            <View style={styles.actionContainer}>
                                <TouchableOpacity onPress={() => handleEditActivity(item.id)}>
                                    <Text style={[styles.editButton, { color: currentColors.primaryButton }]}>Editar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => removeActivity(item.id)}>
                                    <Text style={[styles.deleteButton, { color: currentColors.primaryButton }]}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
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
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    importance: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    highImportance: {
        color: '#FF6347', 
    },
    mediumImportance: {
        color: '#FFA500', 
    },
    lowImportance: {
        color: '#32CD32', 
    },
    activityDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    activityDate: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    activityTime: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    actionContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 10,
        height: 60, 
    },
    deleteButton: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
    },
    completionCircle: {
        borderRadius: 25,
        borderWidth: 2,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completionCircleFilled: {
        borderRadius: 25,
        width: 18,
        height: 18,
    },
    editButton: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8, // Separar el botón de eliminar
    },
});

export default HabitList;
