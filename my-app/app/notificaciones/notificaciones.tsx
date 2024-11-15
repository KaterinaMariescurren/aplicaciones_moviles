import { EstacionamientoDataBase, useDatabase } from "../database/useDatabase";
import PushNotification from 'react-native-push-notification';

const verificarNotificaciones = async () => {
    const database = useDatabase();
    const ahora = new Date();
    
    // Obtén todos los estacionamientos activos
    const estacionamientosActivos = await (await database).listEstacionamientosActivos();

    estacionamientosActivos.forEach((estacionamiento) => {
        const horaEstacionamiento = new Date(estacionamiento.horario);
        const horasTranscurridas = Math.floor((ahora.getTime() - horaEstacionamiento.getTime()) / (1000 * 60 * 60));

        // Si ha pasado al menos 1 hora y es un múltiplo exacto
        if (horasTranscurridas > 0 && horasTranscurridas % 1 === 0) {
            programarNotificacionesRecurrentes(estacionamiento);
        }
    });
};

// Función para programar las notificaciones recurrentes
const programarNotificacionesRecurrentes = (estacionamiento: EstacionamientoDataBase) => {
    const horaEstacionamiento = new Date(estacionamiento.horario);

    for (let i = 1; i <= 24; i++) { // Programa notificaciones para 24 horas
        const horaNotificacion = new Date(horaEstacionamiento.getTime() + i * 60 * 60 * 1000); // Cada hora

        PushNotification.localNotificationSchedule({
            title: "Recordatorio de Estacionamiento",
            message: `Han pasado ${i} hora(s) desde que estacionaste el vehículo con patente ${estacionamiento.patente}
            en ${estacionamiento.ubicacion}.`,
            date: horaNotificacion, // Hora específica
            allowWhileIdle: true, // Permite que la notificación se muestre cuando la app esté inactiva
        });
    }

    console.log("Notificaciones programadas para 24 horas.");
};

export {verificarNotificaciones}
