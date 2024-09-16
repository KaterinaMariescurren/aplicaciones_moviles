package com.example.ciudades.database

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.ciudades.entity.Ciudad

@Database(
    entities = [ Ciudad :: class],
    version = 1,
    exportSchema = false,
)

abstract class Ciudad_database : RoomDatabase() {
    abstract fun ciudadesDAO() : CiudadesDataBaseDAO
}