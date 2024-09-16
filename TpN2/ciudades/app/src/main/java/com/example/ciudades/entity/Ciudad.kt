package com.example.ciudades.entity

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "Ciudad")
data class Ciudad(
    @PrimaryKey(autoGenerate = true)
    val id : Int = 0,
    @ColumnInfo("nombre_ciudad")
    val nombre_ciudad: String,
    @ColumnInfo("nombre_pais")
    val nombre_pais: String,
    @ColumnInfo("poblacion")
    val poblacion: Int,
)
