package com.example.adividar_numero

import android.content.Context
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import kotlin.random.Random

class MainActivity : AppCompatActivity() {

    private var puntaje = 0
    private var mejor_puntaje = 0
    private var intento = 5
    private var numero_random = 0

    // el lateinit se utiliza en escenarios donde la inicialización de la propiedad depende de
    // algún proceso o contexto que no está disponible en el momento de la creación
    private lateinit var tv_puntaje: TextView
    private lateinit var tv_mejor_puntaje: TextView
    private lateinit var tv_intento: TextView
    private lateinit var et_numero_entrada: EditText
    private lateinit var btn_adivinar: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val et_numero_entrada = findViewById<EditText>(R.id.et_numero_entrada)
        val tv_mejor_puntaje = findViewById<TextView>(R.id.tv_mejor_puntaje)
        val tv_puntaje = findViewById<TextView>(R.id.tv_puntaje)
        val tv_intento = findViewById<TextView>(R.id.tv_intento)
        val btn_adivinar = findViewById<Button>(R.id.btn_adivinar)

        // Cargar la mejor puntuación de SharedPreferences
        val sharedPreferences = getSharedPreferences("game_prefs", Context.MODE_PRIVATE)
        mejor_puntaje = sharedPreferences.getInt("mejor_puntaje", 0)
        tv_mejor_puntaje.text = "Mejor puntuación: $mejor_puntaje"

        generar_numero_random()

        btn_adivinar.setOnClickListener{
            check_btn()
        }
    }

    private fun generar_numero_random() {
        numero_random = Random.nextInt(1, 6)
    }

    //logica para verificar que el numero que ingresa esta [1,5], y si es igual al random
    private  fun check_btn() {
        val adivinar = et_numero_entrada.text.toString().toIntOrNull()

        if (adivinar == null || adivinar !in 1..5) {
            Toast.makeText(this, "Por favor ingresa un número entre 1 y 5", Toast.LENGTH_SHORT).show()
            return
        }

        if (adivinar == numero_random) {
            puntaje = puntaje + 10
            tv_puntaje.text = "Puntaje actual: $puntaje"
            intento = 5
            tv_intento.text = "Intentos restantes: $intento"
            Toast.makeText(this, "¡Correcto! Has ganado 10 puntos.", Toast.LENGTH_SHORT).show()
            generar_numero_random()

        } else {
            intento= intento - 1
            tv_intento.text = "Intentos restantes: $intento"

            if (intento == 0) {
                puntaje = 0
                tv_puntaje.text = "Puntaje actual: $puntaje"
                intento = 5
                tv_intento.text = "Intentos restantes: $intento"
                Toast.makeText(this, "Lo lamento, perdiste. El puntaje se reinicia.", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Incorrecto. Intenta nuevamente.", Toast.LENGTH_SHORT).show()
            }
        }

        // Verificar si se ha superado la mejor puntuación
        if (puntaje > mejor_puntaje) {
            mejor_puntaje = puntaje
            tv_mejor_puntaje.text = "Mejor puntuación: $mejor_puntaje"
            guardar_mejor_puntaje()
        }
    }

    private fun guardar_mejor_puntaje(){
        val sharedPreferences = getSharedPreferences("game_prefs", Context.MODE_PRIVATE)
        val editar = sharedPreferences.edit()
        editar.putInt("mejor_puntaje", mejor_puntaje)
        editar.apply()
    }
}