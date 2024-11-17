import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        alert('Permisos para notificaciones no otorgados.');
        return;
      }
    }
    console.log('Permisos otorgados para notificaciones.');
  }

// Esta función se encarga de programar las notificaciones a las 19:40 y 20:00
const programarNotificacionesDiarias = async () => {
    // Obtener la fecha y hora actual
    const now = new Date();
  
    // Programar la primera notificación para las 19:40
    const hora1940 = new Date();
    hora1940.setHours(19, 40, 0, 0); // Establecer las 19:40
  
    // Si ya pasó la hora de las 19:40 hoy, programamos para mañana
    if (now.getHours() >= 19 && now.getMinutes() >= 40) {
      hora1940.setDate(hora1940.getDate() + 1); // Programar para el siguiente día
    }
  
    // Programar la segunda notificación para las 20:00
    const hora2000 = new Date();
    hora2000.setHours(20, 0, 0, 0); // Establecer las 20:00
  
    // Si ya pasó la hora de las 20:00 hoy, programamos para mañana
    if (now.getHours() >= 20 && now.getMinutes() >= 0) {
      hora2000.setDate(hora2000.getDate() + 1); // Programar para el siguiente día
    }
  
    // Eliminar todas las notificaciones programadas anteriormente para evitar duplicados
    await Notifications.cancelAllScheduledNotificationsAsync();
  
    // Programar la notificación de las 19:40
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡ATENCIÓN!",
        body: "Recuerda que se está agotando el tiempo de tu estacionamiento medido. Ingresa a la aplicación y finaliza los estacionamientos activos para evitar cargos adicionales. ¡Gracias por tu colaboración!",
      },
      trigger: {
        date: hora1940, // Fecha y hora para la primera notificación
      },
    });
  
    // Programar la notificación de las 20:00
    await Notifications.scheduleNotificationAsync({
      content: {
        title:"¡Atención! Tu tiempo de estacionamiento ha finalizado",
        body: "Recuerda que el tiempo de estacionamiento medido ya terminó. No olvides finalizar tu estacionamiento para evitar cargos adicionales. ¡Gracias por tu atención!",
      },
      trigger: {
        date: hora2000, // Fecha y hora para la segunda notificación
      },
    });
};

export { programarNotificacionesDiarias, registerForPushNotificationsAsync }
