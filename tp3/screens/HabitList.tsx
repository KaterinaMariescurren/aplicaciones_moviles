// HabitList.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

type HabitListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HabitList'>;

const HabitList: React.FC = () => { // Añadido tipo React.FC
    const navigation = useNavigation<HabitListScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Hábitos</Text>
            <Button
                title="Agregar Nuevo Hábito"
                onPress={() => navigation.navigate("AddHabit")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default HabitList;
