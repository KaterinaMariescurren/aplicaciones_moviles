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
    horario: string,
    ubicacion: string,
    activo: number,
    notificar: number,
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
            activo INTEGER NOT NULL DEFAULT 0,
            notificar INTEGER NOT NULL DEFAULT 0,
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

    async function createEstacionamiento(data: Omit<EstacionamientoDataBase, "id">) {
        const statement = await database.prepareAsync(
            `INSERT INTO estacionamiento 
            (fecha, horario, ubicacion, activo, notificar, auto_id) 
            VALUES ($fecha, $horario, $ubicacion, $activo, $notificar, $auto_id)`
        );
        try {
            const result = await statement.executeAsync({
                $fecha: data.fecha.toISOString(), // Guarda la fecha en formato ISO
                $horario: data.horario,
                $ubicacion: data.ubicacion,
                $activo: data.activo,
                $notificar: data.notificar,
                $auto_id: data.auto_id,
            });
            return { insertedRowId: result.lastInsertRowId.toLocaleString() };
        } catch (error) {
            throw error;
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

    return {createAuto, createEstacionamiento, listAuto, listEstacionamientosActivos, listEstacionamientosNoActivos}
}