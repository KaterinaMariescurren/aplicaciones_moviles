import { View, Text, StyleSheet, Dimensions, PixelRatio } from "react-native";


interface CustomHeaderProps {
    title: string;
  }

    const { width } = Dimensions.get('window');
    const scale = width / 375;

    function normalize(size: number) {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
    }
  
  const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
  }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#656CEE', // Color de fondo del encabezado
        paddingVertical: normalize(20),
        alignItems: 'center',
        width: '100%', // Asegúrate de que se extienda por todo el ancho
        position: 'absolute', // Coloca el encabezado en la parte superior
        top: 0, // Pegado al borde superior
        zIndex: 0, // Asegúrate de que esté en la parte superior
        borderBottomWidth: normalize(5),
        borderBottomColor: '#656CEE33', // Color del borde inferior
        borderBottomLeftRadius: normalize(20),
        borderBottomRightRadius: normalize(20)
      },
      headerTitle: {
        color: '#fff',
        fontSize: normalize(24),
        fontWeight: 'bold',
      },
});

export default CustomHeader;
