import { Modal, TouchableOpacity, View, Text, StyleSheet, Image,  } from "react-native";


interface CustomDespegableDelete {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
  }
  
  const CustomDespegableDelete: React.FC<CustomDespegableDelete> = ({ visible, onClose, children, title,
  }) => {
    
    return (
        <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TouchableOpacity onPress={onClose} >
                    <Text style={styles.modalTitle}>Eliminar Auto</Text>
                    <Image source={require('../assets/images/close-icon.png')} style={styles.closeIcon}></Image>        
                </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>¿Quiere eliminar el auto: {title}?</Text>
          {children}
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: '80%', // Ancho del modal
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5,
        marginVertical:10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196F3', // Color del botón
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
    },
    closeIcon: {
        width: 40,
        height: 40,
      },
})

export default CustomDespegableDelete;