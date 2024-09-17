package com.example.ciudades.viewmodels

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.ciudades.database.CiudadesDataBaseDAO
import com.example.ciudades.entity.Ciudad
import com.example.ciudades.states.Ciudades_states
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.launch

open class Ciudad_viewmodel(private val dao : CiudadesDataBaseDAO) : ViewModel() {
    var estado by mutableStateOf(Ciudades_states())
    val ciudades: Flow<List<Ciudad>> = dao.listar_ciudades().flowOn(Dispatchers.IO)

    init{
        viewModelScope.launch{
            dao.listar_ciudades().collectLatest { estado = estado.copy(
                lista_ciudades = it
                )
            }
        }
    }

    fun insertar_ciudad( ciudad : Ciudad) = viewModelScope.launch {
        dao.insertCiudad( ciudad )
    }

    fun buscar_ciudad_nombre ( nombre_ciudad : String) :Flow<List<Ciudad>>  {
        return dao.buscarCiudadXNombre( nombre_ciudad )
    }

    fun eliminar_ciudad_nombre ( nombre_ciudad : String) = viewModelScope.launch  {
        dao.eliminarCiudadXNombre( nombre_ciudad )
    }

    fun eliminar_ciudad_nombre_pais ( nombre_pais : String) = viewModelScope.launch  {
        dao.eliminarCiudadXPais( nombre_pais )
    }

    fun actualizar_poblacion ( nombre_ciudad : String , poblacion : Int ) = viewModelScope.launch  {

        viewModelScope.launch {
            buscar_ciudad_nombre(nombre_ciudad).collect { ciudades ->
                for (ciudad in ciudades) {
                    dao.actualizarPolacion(ciudad.id, poblacion)
                }
            }
        }
    }
}