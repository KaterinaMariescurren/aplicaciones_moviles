import axios from 'axios';

export const getStreetName = async (latitude: any, longitude: any) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'NombreDeTuApp/1.0 (tu_email@ejemplo.com)'  // Cambia esta línea según tu aplicación
      }
    });
    const address = response.data.address;

    // Extraer los valores de la calle y la altura (número)
    const street = address.road || 'Calle desconocida';
    const height = address.house_number || 'Altura desconocida';

    return { street, height }; // Devuelve la calle y la altura
  } catch (error) {
    console.error('Error al obtener la dirección:', error);
    throw new Error('No se pudo obtener la dirección.');
  }
};
