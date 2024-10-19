// BottomSheet.tsx
import React from 'react';
import { View, Modal, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';

const { height } = Dimensions.get('window');

interface CustomDespegable {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  heightPercentage?: number; // Propiedad opcional para altura
}

const CustomDespegable: React.FC<CustomDespegable> = ({ visible, onClose, children, title, heightPercentage = 0.5
}) => {

  const containerHeight = height * heightPercentage; // Calcular altura del contenedor

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay} onTouchEnd={onClose} />
      <View style={[styles.container, { height: containerHeight }]}>
        <View style={styles.view_cerrar}>
          <Text style={styles.titulo}>{title}</Text>
          <TouchableOpacity onPress={onClose} >
            <Image source={require('../assets/images/close-icon.png')} style={styles.closeIcon}></Image>        
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
  },
  view_cerrar:{
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical:10,
  },
  titulo:{
    fontSize:20,
    fontWeight:'bold'
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
});

export default CustomDespegable;