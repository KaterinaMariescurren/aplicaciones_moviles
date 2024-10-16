import { FlatList, View, StyleSheet, Text, Image, Dimensions} from "react-native";
import CustomButton from "./CustomButtom";

const { width, height } = Dimensions.get('window');

export default function CustomList() {
  return (
      <View style={styles.listContainer}>
        <View style={styles.view_plus_circle}>
          <Text style={styles.listText}>Estacionamientos Activos:</Text>
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
              <CustomButton title="Ver" style={{width:'75%',alignSelf: 'center'}}></CustomButton>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
          />
      </View>
  );
}

const styles = StyleSheet.create({
    listContainer: {
      height: height*0.13,
      width:'100%',
      paddingLeft:17,
      marginBottom:26,
      alignSelf: 'flex-start',
    },
    listText: {
      fontSize: 25.62,
      fontWeight: 'bold', 
    },
    item: {
      width:190,
      marginRight:10,
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
      marginVertical:2,
    },
    plus_circle: {
      width: 27,
      height: 26,
      marginLeft: 'auto',
      marginRight:9,
    },
    view_auto: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 12,
      marginVertical:2,
    },
    auto: {
      width: 20,
      height: 20,
      marginRight:9,
    },
    textName:{
      paddingTop:5,
      fontSize: 16.94,
      color: '#262626',
    },
    textPatent: {
      paddingLeft:12,
      fontSize: 14.82,
      color: '#A5AAB7',
      textAlign: 'left',
    },
});

// data.ts
export const cars = [
    { id: '1', name: 'Mercedes G 63', patente:'1234' },
    { id: '2', name: 'BMW 325i', patente:'4567'},
    { id: '3', name: 'Audi A4', patente:'2187' },
    { id: '4', name: 'Toyota Corolla', patente:'9837' },
  ];
