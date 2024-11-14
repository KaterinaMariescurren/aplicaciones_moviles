import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, ScrollView, Alert } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, useActivityContext } from '../context/ActivityContext';
import { Colors } from '../constants/Colors';
import { Picker } from '@react-native-picker/picker';

// Definir el tipo de la propiedad de la navegación
type EditActivityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditActivity'>;
type EditActivityScreenRouteProp = RouteProp<RootStackParamList, 'EditActivity'>;

const EditActivity: React.FC = () => {
  const navigation = useNavigation<EditActivityScreenNavigationProp>();
  const route = useRoute<EditActivityScreenRouteProp>();
  const { activityId } = route.params; // Obtener el ID de la actividad a editar
  const { activities, editActivity } = useActivityContext();
  const scheme = useColorScheme();
  const currentColors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  // Buscar la actividad a editar
  const activityToEdit = activities.find((activity) => activity.id === activityId);

  // Si no se encuentra la actividad, redirigir a la lista
  if (!activityToEdit) {
    navigation.goBack();
    return null;
  }

  const [title, setTitle] = useState(activityToEdit.title);
  const [description, setDescription] = useState(activityToEdit.description || '');
  const [importance, setImportance] = useState(activityToEdit.importance);
  const [date, setDate] = useState(activityToEdit.date);
  const [time, setTime] = useState(activityToEdit.time);

  const handleSave = () => {

    if (!title || !importance) {
        Alert.alert('Error', 'El título y la importancia son campos obligatorios.');
        return; // Evitar que se envíen los cambios si faltan estos campos
      }

    // Crear un objeto con los campos actualizados
    const updatedActivity: Partial<Activity> = {
      title,
      description,
      importance,
      date,
      time,
    };

    // Llamar a la función editActivity con el ID y los datos actualizados
    editActivity(activityId, updatedActivity);

    // Volver a la pantalla anterior (la lista de actividades)
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <Text style={[styles.label, { color: currentColors.text }]}>Título de la Actividad</Text>
      <TextInput
        style={[
          styles.input, 
          { 
            borderColor: currentColors.text, 
            color: currentColors.text // Este es el cambio importante
          }
        ]}
        placeholderTextColor={currentColors.secondaryText} // Cambiar el color del texto del placeholder
        value={title}
        onChangeText={setTitle}
      />

<Text style={[styles.label, { color: currentColors.text }]}>Descripción (opcional)</Text>
      <TextInput
        style={[
          styles.input, 
          { 
            borderColor: currentColors.text, 
            color: currentColors.text // Asegurarse de que el texto sea visible en modo oscuro
          }
        ]}
        placeholderTextColor={currentColors.secondaryText}
        value={description}
        onChangeText={setDescription}
      />

<Text style={[styles.label, { color: currentColors.text }]}>Importancia</Text>
      <View style={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: currentColors.text,
        overflow: 'hidden',
        backgroundColor: currentColors.inputBackground,
      }}>
        <Picker
          selectedValue={importance}
          style={{
            height: 50,
            width: '100%',
            color: currentColors.text,
            backgroundColor: currentColors.inputBackground,
          }}
          onValueChange={(itemValue) => setImportance(itemValue)}
        >
          <Picker.Item label="Alta" value="Alta" />
          <Picker.Item label="Media" value="Media" />
          <Picker.Item label="Baja" value="Baja" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: currentColors.text }]}>Fecha</Text>
      <TextInput
        style={[
          styles.input, 
          { 
            borderColor: currentColors.text, 
            color: currentColors.text 
          }
        ]}

        placeholderTextColor={currentColors.secondaryText}
        value={date}
        onChangeText={setDate}
      />

<Text style={[styles.label, { color: currentColors.text }]}>Hora</Text>
      <TextInput
        style={[
          styles.input, 
          { 
            borderColor: currentColors.text, 
            color: currentColors.text 
          }
        ]}
        placeholderTextColor={currentColors.secondaryText}
        value={time}
        onChangeText={setTime}
      />
      
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: currentColors.primaryButton }]} onPress={handleSave}>
        <Text style={[styles.saveButtonText, { color: currentColors.buttonText }]}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 0.2,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    justifyContent: 'center',
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default EditActivity;
