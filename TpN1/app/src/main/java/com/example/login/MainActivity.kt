package com.example.login

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    private val ussername: String = "Juan Torres"
    private val password: String = "1234utn"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val usernameEditText = findViewById<EditText>(R.id.ussername)
        val passwordEditText = findViewById<EditText>(R.id.password)
        val loginButton = findViewById<Button>(R.id.iniciarsesion)
        val registerButton = findViewById<Button>(R.id.registarar)

        loginButton.setOnClickListener {
            val enteredUsername = usernameEditText.text.toString()
            val enteredPassword = passwordEditText.text.toString()

            if (enteredUsername == ussername && enteredPassword == password) {
                // Inicio de sesión exitoso
                Toast.makeText(this@MainActivity, "Login Successful", Toast.LENGTH_SHORT)
                    .show()
                // Redirige a la siguiente pantalla
                val datos = Bundle()
                datos.putString("name", enteredUsername)

                val intent = Intent(this, bienvenida_activity::class.java)
                intent.putExtras(datos)
                startActivity(intent)
                finish()

            } else {
                // Inicio de sesión fallido
                Toast.makeText(
                    this@MainActivity,
                    "Invalid Username or Password",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

        registerButton.setOnClickListener{
            val intent = Intent(this, registro_activity::class.java)
            startActivity(intent)
            finish()
        }
    }
}