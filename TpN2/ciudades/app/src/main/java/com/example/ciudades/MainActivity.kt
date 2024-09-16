package com.example.ciudades

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.room.Room
import com.example.ciudades.database.Ciudad_database
import com.example.ciudades.entity.Ciudad
import com.example.ciudades.viewmodels.Ciudad_viewmodel

class MainActivity : ComponentActivity() {

    private val viewModel: Ciudad_viewmodel by viewModels {
        object : ViewModelProvider.Factory {
            @Suppress("UNCHECKED_CAST")
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                val db = Room.databaseBuilder(
                    applicationContext,
                    Ciudad_database::class.java,
                    "ciudades_db"
                ).build()
                return Ciudad_viewmodel(db.ciudadesDAO()) as T
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CiudadApp(viewModel)
        }
    }
}

@Composable
fun CiudadApp(viewModel: Ciudad_viewmodel) {
    var nombreCiudad by remember { mutableStateOf("") }
    var nombrePais by remember { mutableStateOf("") }
    var poblacion by remember { mutableStateOf("") }
    var searchCiudad by remember { mutableStateOf("") }
    var updatePoblacion by remember { mutableStateOf("") }
    var ciudadId by remember { mutableStateOf(0) }

    Column(modifier = Modifier.padding(16.dp)) {
        Text(text = "Agregar Ciudad", style = MaterialTheme.typography.headlineLarge)
        Spacer(modifier = Modifier.height(8.dp))
        OutlinedTextField(
            value = nombreCiudad,
            onValueChange = { nombreCiudad = it },
            label = { Text("Nombre de la Ciudad") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        OutlinedTextField(
            value = nombrePais,
            onValueChange = { nombrePais = it },
            label = { Text("Nombre del País") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        OutlinedTextField(
            value = poblacion,
            onValueChange = { poblacion = it },
            label = { Text("Población") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
        )
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = {
            viewModel.insertar_ciudad(
                Ciudad(
                    nombre_ciudad = nombreCiudad,
                    nombre_pais = nombrePais,
                    poblacion = poblacion.toIntOrNull() ?: 0
                )
            )
            // Clear fields after insertion
            nombreCiudad = ""
            nombrePais = ""
            poblacion = ""
        }) {
            Text(text = "Agregar Ciudad")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Search Ciudad
        OutlinedTextField(
            value = searchCiudad,
            onValueChange = { searchCiudad = it },
            label = { Text("Buscar Ciudad por Nombre") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = { viewModel.buscar_ciudad_nombre(searchCiudad) }) {
            Text(text = "Buscar")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Update Population
        OutlinedTextField(
            value = updatePoblacion,
            onValueChange = { updatePoblacion = it },
            label = { Text("Nueva Población") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
        )
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = {
            viewModel.actualizar_poblacion(ciudadId, updatePoblacion.toIntOrNull() ?: 0)
        }) {
            Text(text = "Actualizar Población")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Delete Ciudad by Name
        Button(onClick = { viewModel.eliminar_ciudad_nombre(searchCiudad) }) {
            Text(text = "Eliminar Ciudad")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Delete Ciudades by Country
        OutlinedTextField(
            value = nombrePais,
            onValueChange = { nombrePais = it },
            label = { Text("Eliminar Ciudades por País") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = { viewModel.eliminar_ciudad_nombre_pais(nombrePais) }) {
            Text(text = "Eliminar Ciudades del País")
        }

        Spacer(modifier = Modifier.height(16.dp))

    }
}
