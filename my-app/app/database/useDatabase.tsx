import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';

export type AutoDataBase = {
    id: number,
    modelo: string,
    marca: string,
    patente: string
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
            duracion TIME NOT NULL,
            ubicacion TEXT NOT NULL,
            auto_id INTEGER NOT NULL REFERENCES auto(id)
        );
    `)

    
// Nombre de la base de datos
const databaseName = "medidoCityBell.db";

    async function deleteDatabase() {
        const databasePath = `${FileSystem.documentDirectory}SQLite/${databaseName}`;

        try {
            // Verificar si el archivo de la base de datos existe
            const fileExists = await FileSystem.getInfoAsync(databasePath);

            if (fileExists.exists) {
                // Eliminar el archivo de la base de datos
                await FileSystem.deleteAsync(databasePath, { idempotent: true });
                console.log(`Base de datos ${databaseName} eliminada exitosamente.`);
            } else {
                console.log(`No se encontró la base de datos ${databaseName}.`);
            }
        } catch (error) {
            console.error("Error al eliminar la base de datos:", error);
        }
    }

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

    return {createAuto , listAuto, deleteDatabase}
}