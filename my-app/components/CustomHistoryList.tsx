import { FlatList, View, StyleSheet, Text, Image, Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

export default function CustomList() {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listText}>Historial de Estacionamientos</Text>
      <FlatList 
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.contain}>
              <View style={styles.view_auto}>
                <Image source={require('../assets/images/auto.png')} resizeMode="contain" style={styles.auto}></Image>
                <Text style={styles.textName_Hour} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              </View>
              <View style={styles.view_calendar}>
                <Image source={require('../assets/images/calendario.png')} resizeMode="contain" style={styles.calendario}></Image>
                <Text style={styles.textName_Hour}>07/10/2024</Text>
              </View>
            </View>
            <View style={styles.contain}>
              <Text style={styles.textPatent}>{item.patente}</Text>
              <View style={styles.view_calendar}>
                <Image source={require('../assets/images/clock-outline.png')} resizeMode="contain" style={styles.reloj}></Image>
                <Text style={styles.textName_Hour}>1h 30m 5s</Text>
              </View>
            </View>
            <View style={styles.view_ubicacion}>
              <Image source={require('../assets/images/map-pointer.png')} resizeMode="contain" style={styles.ubicacion}></Image>
              <Text style={styles.textName_Hour}>472 e/ 26 y 27</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ paddingBottom:15}} />}
        style={{flex:1}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
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

export const cars = [
  { id: '1', name: 'Mercedes G 63 AMG Edition One Limited 2023', patente: '1234' },
  { id: '2', name: 'BMW 325i', patente: '4567' },
  { id: '3', name: 'Audi A4', patente: '2187' },
  { id: '4', name: 'Toyota Corolla', patente: '9837' },
];
