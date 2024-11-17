import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';

export type AutoDataBase = {
    id: number,
    modelo: string,
    marca: string,
    patente: string
}
export type EstacionamientoDataBase
= {
    id: number,
    fecha: Date,
    horario: number,
    ubicacion: string,
    latitude: number,
    longitude: number,
    activo: number,
    auto_id: number
    modelo?: string,
    marca?: string,
    patente?: string
}

export async function useDatabase(){
    const database = await SQLite.openDatabaseAsync("medidoCityBell.db");

    database.execAsync(`
        CREATE TABLE IF NOT EXISTS auto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            modelo TEXT NOT NULL,
            marca TEXT NOT NULL,
            patente TEXT NOT NULL
        );
    `)

    database.execAsync(`
        CREATE TABLE IF NOT EXISTS estacionamiento (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha DATE NOT NULL,
            horario TIME NOT NULL,
            ubicacion TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            activo INTEGER NOT NULL DEFAULT 0,
            auto_id INTEGER NOT NULL REFERENCES auto(id)
        );
    `)

    async function createAuto(data: Omit<AutoDataBase, "id">){
        const statement = await database.prepareAsync(
            "INSERT INTO auto (modelo, marca, patente) VALUES ($modelo, $marca, $patente)"
        )
        try{
            const result = await statement.executeAsync({
                $modelo: data.modelo,
                $marca: data.marca,
                $patente: data.patente
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error){
            throw error
        }
    }

    async function eliminarAuto(autoId: number): Promise<boolean> {
        try {
            // Primero, eliminamos los estacionamientos asociados al auto
            const deleteEstacionamientosStatement = await database.prepareAsync(
                "DELETE FROM estacionamiento WHERE auto_id = $autoId"
            );
            await deleteEstacionamientosStatement.executeAsync({
                $autoId: autoId,
            });
    
            // Ahora, eliminamos el auto
            const deleteAutoStatement = await database.prepareAsync(
                "DELETE FROM auto WHERE id = $autoId"
            );
            const result = await deleteAutoStatement.executeAsync({
                $autoId: autoId,
            });
    
            // Si result.changes > 0, significa que se eliminó el auto
            return result.changes > 0;
        } catch (error) {
            console.error('Error al eliminar el auto y los estacionamientos:', error);
            return false;
        }
    }

    async function createEstacionamiento(data: Omit<EstacionamientoDataBase, "id">) {
        const statement = await database.prepareAsync(
            `INSERT INTO estacionamiento 
            (fecha, horario, ubicacion, latitude, longitude, activo, auto_id) 
            VALUES ($fecha, $horario, $ubicacion, $latitude, $longitude, $activo, $auto_id)`
        );
        try {
            const result = await statement.executeAsync({
                $fecha: data.fecha.toISOString(), // Guarda la fecha en formato ISO
                $horario: data.horario,
                $ubicacion: data.ubicacion,
                $latitude: data.latitude, 
                $longitude: data.longitude,
                $activo: data.activo,
                $auto_id: data.auto_id,
            });
            return { insertedRowId: result.lastInsertRowId.toLocaleString() };
        } catch (error) {
            throw error;
        }
    }

    async function getEstacionamientoById(estacionamientoId: number): Promise<EstacionamientoDataBase | null> {
        try {
            const query = `
                SELECT estacionamiento.*, auto.modelo, auto.marca, auto.patente
                FROM estacionamiento
                JOIN auto ON estacionamiento.auto_id = auto.id
                WHERE estacionamiento.id = $id
            `;
            
            const result = await database.getAllSync<EstacionamientoDataBase>(query, {
                $id: estacionamientoId,
            });
    
            // Si la consulta no devuelve un resultado, retornamos null
            return result[0] ?? null;
        } catch (error) {
            console.error('Error al obtener estacionamiento por id:', error);
            return null;
        }
    }

    async function setActivoToZero(id: number): Promise<boolean> {
        try {
            const statement = await database.prepareAsync(
                'UPDATE estacionamiento SET activo = 0 WHERE id = $id'
            );
            const result = await statement.executeAsync({ $id: id });

            // Usar result.changes para obtener el número de filas afectadas
            return result.changes > 0;  // Si se afectaron filas, la actualización fue exitosa
        } catch (error) {
            console.error('Error al actualizar el valor de activo:', error);
            return false;
        }
    }
    
    async function listAuto(): Promise<AutoDataBase[]> {
        try {
          const query = "SELECT * from auto";
          const response = await database.getAllAsync<AutoDataBase>(query);
          return response ?? [];
        } catch (error) {
          console.log(error);
          return []; // Devuelve un array vacío en caso de error
        }
    }

    async function listAutosNoEstacionados(): Promise<AutoDataBase[]> {
        try {
            const query = `
                SELECT auto.* 
                FROM auto
                LEFT JOIN estacionamiento 
                ON auto.id = estacionamiento.auto_id AND estacionamiento.activo = 1
                WHERE estacionamiento.id IS NULL
            `;
            const results = await database.getAllAsync<AutoDataBase>(query);
            return results ?? [];
        } catch (error) {
            console.error('Error al listar autos no en estacionamiento activo:', error);
            return []; // Devuelve un array vacío en caso de error
        }
    }
    
    async function listEstacionamientosActivos(): Promise<EstacionamientoDataBase[]> {
        try {
            const query = `
            SELECT estacionamiento.*, auto.modelo, auto.marca, auto.patente 
            FROM estacionamiento 
            JOIN auto ON estacionamiento.auto_id = auto.id 
            WHERE estacionamiento.activo = 1
            `;
            const results = await database.getAllAsync<EstacionamientoDataBase>(query);
            return results ?? [];
        } catch (error) {
            console.log(error);
          return []; // Devuelve un array vacío en caso de error
        }
    }

    async function listEstacionamientosNoActivos(): Promise<EstacionamientoDataBase[]> {
        try {
            const query = `
            SELECT estacionamiento.*, auto.modelo, auto.marca, auto.patente 
            FROM estacionamiento 
            JOIN auto ON estacionamiento.auto_id = auto.id 
            WHERE estacionamiento.activo = 0
            `;
            const results = await database.getAllAsync<EstacionamientoDataBase>(query);
            return results ?? [];
        } catch (error) {
          console.log(error);
          return []; // Devuelve un array vacío en caso de error
        }
    }

    return {createAuto, eliminarAuto, createEstacionamiento, listAuto, listAutosNoEstacionados, listEstacionamientosActivos, listEstacionamientosNoActivos, getEstacionamientoById, setActivoToZero }
}