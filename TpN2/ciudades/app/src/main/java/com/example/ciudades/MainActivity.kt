package com.example.ciudades

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.room.Room
import com.example.ciudades.database.Ciudad_database
import com.example.ciudades.entity.Ciudad
import com.example.ciudades.viewmodels.Ciudad_viewmodel
import kotlinx.coroutines.launch

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
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "home") {
        composable("home") { HomeScreen(navController) }
        composable("add") { AddCityScreen(viewModel, navController) }
        composable("list") { CityListScreen(viewModel) }
        composable("search") { SearchCityScreen(viewModel) }
        composable("update") { UpdateCityScreen(viewModel, navController) }
        composable("delete") { DeleteCityScreen(navController) }
        composable("delete_by_name") { DeleteCityByNameScreen(viewModel, navController) }
        composable("delete_by_country") { DeleteCityByCountryScreen(viewModel, navController) }
    }
}

@Composable
fun HomeScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Color de fondo de la pantalla
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = { navController.navigate("add") }) {
            Text(
                text = "Agregar Ciudad",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )

        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = { navController.navigate("list") }) {
            Text(
                text = "Mostrar Ciudades",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = { navController.navigate("search") }) {
            Text(
                text = "Buscar Ciudad",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = { navController.navigate("update") }) {
            Text(
                text = "Actualizar Ciudad",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = { navController.navigate("delete") }) {
            Text(
                text = "Eliminar Ciudad",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
    }
}

@Composable
fun AddCityScreen(viewModel: Ciudad_viewmodel, navController: NavController) {
    var nombreCiudad by remember { mutableStateOf("") }
    var nombrePais by remember { mutableStateOf("") }
    var poblacion by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Agregar Ciudad",
            style = TextStyle(
                fontSize = 20.sp, // Tamaño del texto
                fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
            ),
            color = colorResource(R.color.text)
        )
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
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = {
            viewModel.insertar_ciudad(
                Ciudad(
                    nombre_ciudad = nombreCiudad,
                    nombre_pais = nombrePais,
                    poblacion = poblacion.toIntOrNull() ?: 0
                )
            )
            nombreCiudad = ""
            nombrePais = ""
            poblacion = ""
            navController.navigate("home") // Regresa al home después de agregar
        }) {
            Text(
                text = "Agregar Ciudad",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
    }
}

@Composable
fun CityListScreen(viewModel: Ciudad_viewmodel) {
    val ciudades by viewModel.ciudades.collectAsState(initial = emptyList())

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Lista de Ciudades",
            style = MaterialTheme.typography.headlineLarge,
            color = colorResource(R.color.text)
        )
        Spacer(modifier = Modifier.height(8.dp))
        LazyColumn {
            items(ciudades) { ciudad ->
                CityCard(ciudad)
                Spacer(modifier = Modifier.height(8.dp))
            }
        }
    }
}

@Composable
fun SearchCityScreen(viewModel: Ciudad_viewmodel) {
    var nombre_ciudad by remember { mutableStateOf("") }
    var ciudades_buscadas by remember { mutableStateOf<List<Ciudad>>(emptyList()) }
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Buscar Ciudad",
            style = TextStyle(
                fontSize = 20.sp, // Tamaño del texto
                fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
            ),
            color = colorResource(R.color.text)
        )
        OutlinedTextField(
            value = nombre_ciudad,
            onValueChange = { nombre_ciudad = it },
            label = { Text("Nombre de la Ciudad") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = {
            scope.launch {
                viewModel.buscar_ciudad_nombre(nombre_ciudad).collect { ciudades ->
                    ciudades_buscadas = ciudades
                }
            }
        }) {
            Text(
                text = "Buscar",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
        Spacer(modifier = Modifier.height(16.dp))
        LazyColumn {
            items(ciudades_buscadas) { ciudad ->
                CityCard(ciudad)
                Spacer(modifier = Modifier.height(8.dp))
            }
        }
    }
}

@Composable
fun UpdateCityScreen(viewModel: Ciudad_viewmodel, navController: NavController) {
    var poblacion by remember { mutableStateOf("") }
    var nombre_ciudad by remember { mutableStateOf("") }
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Actualizar Ciudad",
            style = TextStyle(
                fontSize = 20.sp, // Tamaño del texto
                fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
            ),
            color = colorResource(R.color.text)
        )
        OutlinedTextField(
            value = nombre_ciudad,
            onValueChange = { nombre_ciudad = it },
            label = { Text("Nombre de la Ciudad") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        OutlinedTextField(
            value = poblacion,
            onValueChange = { poblacion = it },
            label = { Text("Nueva Población") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = {
            scope.launch {
                viewModel.actualizar_poblacion(nombre_ciudad, poblacion.toIntOrNull() ?: 0)
            }
            navController.navigate("home") // Regresa al home después de actualizar
        }) {
            Text(
                text = "Actualizar Población",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
    }
}

@Composable
fun DeleteCityScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Eliminar Ciudad",
            style = TextStyle(
                fontSize = 20.sp, // Tamaño del texto
                fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
            ),
            color = colorResource(R.color.text)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = { navController.navigate("delete_by_name") }) {
            Text(
                text = "Eliminar por Nombre",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = { navController.navigate("delete_by_country") }) {
            Text(
                text = "Eliminar por País",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
    }
}

@Composable
fun DeleteCityByNameScreen(viewModel: Ciudad_viewmodel, navController: NavController) {
    var nombre_ciudad by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Eliminar Ciudad por Nombre",
            style = TextStyle(
                fontSize = 20.sp, // Tamaño del texto
                fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
            ),
            color = colorResource(R.color.text)
        )
        OutlinedTextField(
            value = nombre_ciudad,
            onValueChange = { nombre_ciudad = it },
            label = { Text("Nombre de la Ciudad") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text) // Color del texto del botón
            ),
            onClick = {
            viewModel.eliminar_ciudad_nombre(nombre_ciudad)
            navController.navigate("home")
        }) {
            Text(
                text = "Eliminar Ciudad",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
    }
}

@Composable
fun DeleteCityByCountryScreen(viewModel: Ciudad_viewmodel, navController: NavController) {
    var nombre_pais by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Eliminar Ciudad por País",
            style = TextStyle(
                fontSize = 20.sp, // Tamaño del texto
                fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
            ),
            color = colorResource(R.color.text)
        )
        OutlinedTextField(
            value = nombre_pais,
            onValueChange = { nombre_pais = it },
            label = { Text("Nombre del País") },
            modifier = Modifier.fillMaxWidth(),
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp), // Ajusta la altura del botón
            colors = ButtonDefaults.buttonColors(
                containerColor = colorResource(R.color.button), // Color de fondo del botón
                contentColor = colorResource(R.color.text_button) // Color del texto del botón
            ),
            onClick = {
            viewModel.eliminar_ciudad_nombre_pais(nombre_pais)
            navController.navigate("home")
        }) {
            Text(
                text = "Eliminar",
                style = TextStyle(
                        fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                )
            )
        }
    }
}

@Composable
fun CityCard(ciudad: Ciudad) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .background(colorResource(R.color.background)) // Cambia el color de fondo aquí
            .padding(8.dp),
        elevation = CardDefaults.elevatedCardElevation(4.dp),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = colorResource(R.color.background1))
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth()
        ) {
            Text(
                text = "Ciudad: ${ciudad.nombre_ciudad}",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                ),
                color = colorResource(R.color.text)
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "País: ${ciudad.nombre_pais}",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                ),
                color = colorResource(R.color.text)
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "Población: ${ciudad.poblacion}",
                style = TextStyle(
                    fontSize = 20.sp, // Tamaño del texto
                    fontWeight = FontWeight.Bold, // Opcional: Hacer el texto en negrita
                ),
                color = colorResource(R.color.text)

            )
        }
    }
}


