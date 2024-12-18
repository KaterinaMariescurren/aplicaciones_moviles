import { FlatList, View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Modal, TextInput, Alert} from "react-native";
import React, { useEffect, useState } from 'react';
import CustomDespegable from "./CustomDespegable";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "./CustomButtom";
import { AutoDataBase, useDatabase } from "@/app/database/useDatabase";
import CustomDespegableDelete from "./CustomDespegableDelete";

const { width, height } = Dimensions.get('window');

// Definimos la interfaz para las props del componente
interface CustomCarListProps {
  autos: AutoDataBase[]; // Tipo de la lista de autos
  addAuto: (newAuto: AutoDataBase) => void; // Tipo de la función para agregar un auto
  eliminarAutoDesdeLista?: (id:number) => void
  mode: "popup" | "selection"; // Modo de la lista (emergente o selección)
  onSelectAuto: (id: number) => void; // Función para manejar la selección de un auto
}

export default function CustomCarList({ autos, addAuto, mode, onSelectAuto, eliminarAutoDesdeLista }: CustomCarListProps) {
  const database = useDatabase();
  
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [patente, setPatente ] = useState("");

  const [modeBoton, setModeBoton ] = useState(false);

  // Estados para el manejo del bottom sheet y el auto seleccionado
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState<AutoDataBase | null>(null);
  
  // Funciones para abrir y cerrar el bottom sheet
  const openBottomSheet = () => {
    setMarca("");
    setModelo("");
    setPatente("");
    setModeBoton(false);
    setBottomSheetVisible(true); // Show the bottom sheet
  };
  
  // Cerrar el bottom sheet
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    setSelectedAuto(null); // Reiniciar el auto seleccionado
  };

  // Función para crear un nuevo auto
  async function createAuto(){
    try{
      console.log('Creando un Auto');
      const newAuto: AutoDataBase = {
        marca, modelo, patente,
        id: 0
      }; // Crear un objeto auto
      const result = await (await database).createAuto(newAuto);
      const autoWithId: AutoDataBase = {
        ...newAuto,
        id: parseInt(result.insertedRowId), // Asignamos el id generado por la base de datos
      };
      addAuto(autoWithId); // Llamar a la función para agregar el auto
    }catch(error){
        console.log(error)
    }
  }

  // Función para eliminar un auto
  async function eliminarAuto(){
    try {

      if (!selectedAuto) {
        Alert.alert("No hay auto seleccionado");
        return;
      }
      if (!eliminarAutoDesdeLista) {
        Alert.alert("No hay funcion para eliminar");
        return;
      }
      console.log("Eliminando Auto");
      await (await database).eliminarAuto(selectedAuto.id);
      
      // Llama a la función recibida como prop para actualizar la lista
      eliminarAutoDesdeLista(selectedAuto.id);
    } catch (error) {
      console.error("Error al eliminar el auto", error);
      Alert.alert("Error al eliminar el auto");
    }
  }

  // Maneja la selección de un auto
  const handleItemPress = (item: AutoDataBase) => {
    setSelectedAuto(item); // Asegúrate de actualizar el auto seleccionado correctamente.
    if (mode === "popup") {
      // Si el modo es popup, abre el bottom sheet directamente
      setMarca(item.marca);
      setModelo(item.modelo);
      setPatente(item.patente);
      setModeBoton(true); // Habilita el botón de eliminar
      setBottomSheetVisible(true); // Muestra el bottom sheet
    } else if (mode === "selection") {
      onSelectAuto(item.id); // Llama a la función onSelectAuto para pasar el id del auto
    }
  };

  const [openMarca, setOpenMarca] = useState(false);
  const [marcas] = useState([
    { label: 'Toyota', value: 'toyota' },
    { label: 'Ford', value: 'ford' },
    { label: 'BMW', value: 'bmw' },
  ]);

  const [openModelo, setOpenModelo] = useState(false);
  const [modelos] = useState([
    { label: 'Corolla', value: 'corolla' },
    { label: 'Mustang', value: 'mustang' },
    { label: 'X5', value: 'x5' },
  ]);

  const renderAutoItem = React.useCallback(({ item }: { item: AutoDataBase }) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item)}
      style={[
        styles.item,
        mode === "selection" && selectedAuto?.id === item.id && {
          borderColor: "#FF4500",
          borderWidth: 2,
        },
      ]}
    >
      <View style={styles.view_auto}>
        <Image
          source={require("../assets/images/auto.png")}
          resizeMode="contain"
          style={styles.auto}
        />
        <Text style={styles.textName}>
          {item.marca} {item.modelo}
        </Text>
      </View>
      <Text style={styles.textPatent}>{item.patente}</Text>
    </TouchableOpacity>
  ), [selectedAuto, mode]); // Solo se actualiza cuando `selectedAuto` o `mode` cambian

  return (
    <View style={styles.listContainer}>
      <View style={styles.view_plus_circle}>
        <Text style={styles.listText}>Mis Autos:</Text>
        <TouchableOpacity onPress={openBottomSheet} style={{marginLeft: 'auto'}}>
          <Image source={require('../assets/images/icon/icon-plus.png')} resizeMode="contain" style={styles.plus_circle} tintColor="#FF4500"></Image>
        </TouchableOpacity>
      </View>
      <FlatList
        data={autos}
        horizontal
        keyExtractor={(item) => String(item.id)}
        renderItem={renderAutoItem} // Usamos la versión memoizada de renderItem
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
          <CustomButton
            title={mode === "popup" && modeBoton===true ? "Eliminar" : "Agregar"}
            onPress={() => {
              if (mode === "popup" && modeBoton===true) {
                // Aquí llamas a la función para eliminar el auto
                eliminarAuto();
                closeBottomSheet();
              } else {
                // Aquí llamas a la función para agregar un auto
                createAuto();
                closeBottomSheet();
              }
            }}
            style={{ marginVertical: 30, height: '35%' }}
          />
          
        </View>
      </CustomDespegable>
    </View>
  );
}

const styles = StyleSheet.create({
    listContainer: {
      height: height * 0.13,
      width: '100%',
      paddingHorizontal: 17,
      marginBottom: 26,
    },
    listText: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'#203D65'
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
      width: 22,
      height: 26,
      marginRight: 9,
    },
    view_auto: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 12,
      marginVertical: 6,
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
