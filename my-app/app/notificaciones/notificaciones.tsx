import { EstacionamientoDataBase, useDatabase } from "../database/useDatabase";
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const verificarNotificaciones = async () => {
    const database = useDatabase();
    const ahora = new Date();
    
    // Obtén todos los estacionamientos activos y a notificar
    const estacionamientosActivos = await (await database).listEstacionamientosANotificar();

    estacionamientosActivos.forEach((estacionamiento) => {
        const horaEstacionamiento = new Date(estacionamiento.horario);
        const horasTranscurridas = Math.floor((ahora.getTime() - horaEstacionamiento.getTime()) / (1000 * 60 * 60));

        // Si ha pasado al menos 1 hora y es un múltiplo exacto
        if (horasTranscurridas > 0 && horasTranscurridas % 1 === 0) {
            programarNotificacionesRecurrentes(estacionamiento);
        }
    });
};

const programarNotificacionDiaria20hs = async () => {
    const notificacionProgramada = await AsyncStorage.getItem('notificacion20hs');

    if (notificacionProgramada) {
        console.log("La notificación diaria ya está programada.");
        return;
    }

    const ahora = new Date();
    const hora20hs = new Date();
    hora20hs.setHours(17, 10, 0, 0);

    if (ahora > hora20hs) {
        hora20hs.setDate(hora20hs.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
        title: "Recordatorio Diario",
        message: "Recuerda que a partir de las 20:00 horas no hay disponibilidad de estacionamiento medido.",
        date: hora20hs,
        repeatType: 'day',
        allowWhileIdle: true,
    });

    console.log("Notificación diaria programada para las 20:00 horas.");
    await AsyncStorage.setItem('notificacion20hs', 'true');
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

export {verificarNotificaciones, programarNotificacionDiaria20hs}
