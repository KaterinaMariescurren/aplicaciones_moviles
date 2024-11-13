import { EstacionamientoDataBase } from "@/app/database/useDatabase";
import { FlatList, View, StyleSheet, Text, Image, Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

interface CustomEstacListProps {
  estacionamientos: EstacionamientoDataBase[];
}

export default function CustomList({ estacionamientos }: CustomEstacListProps) {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listText}>Historial de Estacionamientos</Text>
      <FlatList 
        data={estacionamientos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.contain}>
              <View style={styles.view_auto}>
                <Image source={require('../assets/images/auto.png')} resizeMode="contain" style={styles.auto}></Image>
                <Text style={styles.textName_Hour} numberOfLines={1} ellipsizeMode="tail">{item.modelo} {item.marca}</Text>
              </View>
              <View style={styles.view_calendar}>
                <Image source={require('../assets/images/calendario.png')} resizeMode="contain" style={styles.calendario}></Image>
                <Text style={styles.textName_Hour}>{item.activo}</Text>
              </View>
            </View>
            <View style={styles.contain}>
              <Text style={styles.textPatent}>{item.patente}</Text>
              <View style={styles.view_calendar}>
                <Image source={require('../assets/images/clock-outline.png')} resizeMode="contain" style={styles.reloj}></Image>
                <Text style={styles.textName_Hour}>{item.horario}</Text>
              </View>
            </View>
            <View style={styles.view_ubicacion}>
              <Image source={require('../assets/images/map-pointer.png')} resizeMode="contain" style={styles.ubicacion}></Image>
              <Text style={styles.textName_Hour}>{item.ubicacion}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ paddingBottom:15}} />}
        style={{flex:1}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}  // Desactiva el desplazamiento dentro del FlatList
        nestedScrollEnabled={true} // Permite desplazamiento anidado
      />
    </View>
  );
}

const styles = StyleSheet.create({
    listContainer: {
      height: '100%',
      width:'100%',
      alignSelf: 'flex-start',
    },
    listText: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold', 
    },
    item: {
      width:'100%',
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      justifyContent: 'center', 
      marginVertical:10,
      borderRadius: 16.94,
      borderWidth: 0.3,
      borderColor: '#656CEE', 
      shadowColor: '#8B91FC1A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    contain: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      marginVertical:2,
      paddingHorizontal:10
    },
    view_auto:{
      flexDirection: 'row',
      flexShrink: 1, 
    },
    auto: {
      width: 20,
      height: 20,
      marginRight:10,
      marginTop:5,
    },
    textName_Hour:{
      marginTop:5,
      fontSize: 16.94,
      color: '#262626',
      flexShrink: 1,
    },
    view_calendar:{
      flexDirection: 'row',
      marginRight:10
    },
    reloj:{
      width: 20,
      height: 20,
      marginRight:20,
      marginTop:8,
    },
    calendario:{
      width: 20,
      height: 20,
      marginRight:10,
      marginTop:8,
    },
    textPatent: {
      fontSize: 14.82,
      color: '#A5AAB7',
    },
    view_ubicacion:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom:4
    },
    ubicacion:{
      width: 20,
      height: 20,
      marginTop:8,
    },
});
