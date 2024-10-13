import { FlatList, View, StyleSheet, Text, Dimensions, PixelRatio} from "react-native";


const { width } = Dimensions.get('window');
const scale = width / 375;
const baseWidth = 375;

function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

const px = (size: number) => {
  return PixelRatio.roundToNearestPixel((size * width) / baseWidth);
};
export default function CustomList() {
  return (
      <View style={styles.listContainer}>
        <Text style={styles.listText}>Mis Autos:</Text>
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textPatent}>{item.patente}</Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
  );
}

const styles = StyleSheet.create({
    listContainer: {
      height: 152,
      width:'100%',
      paddingBottom:36,
      paddingLeft:2,
    },
    list: {
      height:75.38,
      width:'100%',
      paddingLeft: normalize(16),
    },
    listText: {
      alignSelf: 'flex-start', // Alinea el texto a la izquierda
      marginLeft: normalize(20), // Espacio del borde izquierdo
      fontSize: normalize(18), // Tamaño de la fuente
      fontWeight: 'bold', // Texto en negrita
    },
    item: {
      backgroundColor: '#ffffff',
      paddingTop: normalize(5),
      paddingLeft: normalize(5), 
      marginRight: normalize(10),
      borderRadius: normalize(15),
      borderWidth: 0.8, 
      borderColor: '#656CEE', 
      shadowColor: '#8B91FC1A',
      shadowOffset: { width: 0, height: normalize(2) },
      shadowOpacity: 0.3,
      shadowRadius: normalize(4),
      elevation: 5,
      width: normalize(150),
    },
    textName:{
      fontSize: 16.94,
      color: '#262626',
      textAlign: 'left',
    },
    textPatent: {
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
