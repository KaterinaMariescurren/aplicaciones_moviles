import { View, Text, StyleSheet, Dimensions, PixelRatio } from "react-native";


interface CustomHeaderProps {
    title: string;
  }

    const { width, height } = Dimensions.get('window');
  
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
        alignItems: 'center',
        paddingVertical:'5%',
        width: '100%', // Asegúrate de que se extienda por todo el ancho
        height: height*0.10,
        position: 'absolute', // Coloca el encabezado en la parte superior
        top: 0, // Pegado al borde superior
        zIndex: 0, // Asegúrate de que esté en la parte superior
        borderColor:'#656CEE',
        borderWidth:0.3,
        shadowColor: '#8B91FC',
        borderBottomLeftRadius: 20, // Radio de esquina inferior izquierda
        borderBottomRightRadius: 20, // Radio de esquina inferior derecha
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
      headerTitle: {
        color: '#fff',
        fontSize: 22.83,
        fontWeight: 'bold',
      },
});

export default CustomHeader;
