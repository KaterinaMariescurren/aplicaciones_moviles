import { FlatList, View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Modal, TextInput} from "react-native";
import React, { useState } from 'react';
import CustomDespegable from "./CustomDespegable";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "./CustomButtom";

const { width, height } = Dimensions.get('window');

export default function CustomList() {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => setBottomSheetVisible(true);
  const closeBottomSheet = () => setBottomSheetVisible(false);

  const cars = [
    { id: '1', name: 'Mercedes G 63', patente:'1234' },
    { id: '2', name: 'BMW 325i', patente:'4567'},
    { id: '3', name: 'Audi A4', patente:'2187' },
    { id: '4', name: 'Toyota Corolla', patente:'9837' },
  ];

  const [openMarca, setOpenMarca] = useState(false);
  const [marca, setMarca] = useState(null);
  const [marcas] = useState([
    { label: 'Toyota', value: 'toyota' },
    { label: 'Ford', value: 'ford' },
    { label: 'BMW', value: 'bmw' },
  ]);

  const [openModelo, setOpenModelo] = useState(false);
  const [modelo, setModelo] = useState(null);
  const [modelos] = useState([
    { label: 'Corolla', value: 'corolla' },
    { label: 'Mustang', value: 'mustang' },
    { label: 'X5', value: 'x5' },
  ]);

  const [patente, setPatente] = useState('');

  // Cambia el estado del modelo al abrir la marca
  const handleOpenMarca = () => {
    setOpenModelo(false); // Cerrar modelo
    setOpenMarca(true);
  };

  // Cambia el estado del modelo al abrir la marca
  const handleOpenModelo = () => {
    setOpenMarca(false); // Cerrar marca
    setOpenModelo(true);
  };

  const handlePressAgregar = () => {
    alert('Botón "Agregar" presionado!');
    // Aquí puedes añadir la lógica adicional que necesites
  };

  return (
    <View style={styles.listContainer}>
      <View style={styles.view_plus_circle}>
        <Text style={styles.listText}>Mis Autos:</Text>
        <TouchableOpacity onPress={openBottomSheet} style={{marginLeft: 'auto'}}>
          <Image source={require('../assets/images/plus-circle.png')} resizeMode="contain" style={styles.plus_circle}></Image>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cars}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.view_auto}>
              <Image source={require('../assets/images/auto.png')} resizeMode="contain" style={styles.auto}></Image>
              <Text style={styles.textName}>{item.name}</Text>
            </View>
            <Text style={styles.textPatent}>{item.patente}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        showsHorizontalScrollIndicator={false}
      />
      <CustomDespegable visible={isBottomSheetVisible} onClose={closeBottomSheet} title="Auto">
        <View style={styles.container}>
          <DropDownPicker
            open={openMarca}
            value={marca}
            items={marcas}
            setOpen={setOpenMarca} // Cambiado para manejar el estado
            setValue={setMarca}
            placeholder="Marca del Auto"
            placeholderStyle={{color:'#5B5B7E'}}
            style={styles.dropdown}
            dropDownContainerStyle={[styles.dropdownContainer, { marginBottom: 15 }]} // Añadir margen
            dropDownDirection="TOP" // Abrir hacia arriba
          />
          <DropDownPicker
            open={openModelo}
            value={modelo}
            items={modelos}
            setOpen={setOpenModelo} // Cambiado para manejar el estado
            setValue={setModelo}
            placeholder="Modelo"
            placeholderStyle={{color:'#5B5B7E'}}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            dropDownDirection="TOP" // Abrir hacia arriba
          />
          <TextInput
            style={styles.input}
            placeholder="Patente"
            placeholderTextColor="#5B5B7E"
            value={patente}
            onChangeText={setPatente}
          />
          <CustomButton title="Agregar" onPress={handlePressAgregar} style={{marginVertical:30, height:'35%',}}></CustomButton>
        </View>
      </CustomDespegable>
    </View>
  );
}

const styles = StyleSheet.create({
    listContainer: {
      height: height * 0.13,
      width: '100%',
      paddingLeft: 17,
      marginBottom: 26,
      alignSelf: 'flex-start',
    },
    listText: {
      fontSize: 25.62,
      fontWeight: 'bold',
    },
    item: {
      width: 190,
      marginRight: 10,
      backgroundColor: '#ffffff',
      borderRadius: 16.94,
      borderWidth: 0.3,
      borderColor: '#656CEE',
      shadowColor: '#8B91FC1A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    view_plus_circle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 2,
    },
    plus_circle: {
      width: 27,
      height: 26,
      marginRight: 9,
    },
    view_auto: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 12,
      marginVertical: 2,
    },
    auto: {
      width: 20,
      height: 20,
      marginRight: 9,
    },
    textName: {
      paddingTop: 5,
      fontSize: 16.94,
      color: '#262626',
    },
    textPatent: {
      paddingLeft: 12,
      fontSize: 14.82,
      color: '#A5AAB7',
      textAlign: 'left',
    },
    container: {
      flex: 1,
      padding: 20,
    },
    dropdown: {
      borderWidth: 0.5,
      backgroundColor: '#FFFFFF',
      borderColor: '#656CEE',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    dropdownContainer: {
      borderColor: '#d0d0ff',
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderWidth: 0.5,
      borderColor: '#656CEE',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 12,
    },
});
