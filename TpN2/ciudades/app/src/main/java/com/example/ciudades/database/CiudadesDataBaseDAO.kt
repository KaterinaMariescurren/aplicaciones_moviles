package com.example.ciudades.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.example.ciudades.entity.Ciudad
import kotlinx.coroutines.flow.Flow

@Dao

interface CiudadesDataBaseDAO {
    @Insert
    suspend fun insertCiudad(ciudad: Ciudad)

    @Query("SELECT * FROM Ciudad")
    fun listar_ciudades() : Flow <List <Ciudad> >

    @Query("SELECT * FROM Ciudad WHERE nombre_ciudad LIKE :nombre_ciudad")
    fun buscarCiudadXNombre(nombre_ciudad:String) : Flow <List <Ciudad> >

    @Query("DELETE FROM Ciudad WHERE nombre_ciudad LIKE :nombre_ciudad")
    suspend fun eliminarCiudadXNombre(nombre_ciudad:String)

    @Query("DELETE FROM Ciudad WHERE nombre_pais LIKE :nombre_pais")
    suspend fun eliminarCiudadXPais(nombre_pais: String)

    @Query("UPDATE Ciudad SET poblacion = :poblacion WHERE id = :id")
    suspend fun actualizarPolacion(id: Int, poblacion: Int)
}