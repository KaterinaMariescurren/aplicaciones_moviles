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

class registro_activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_registro)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val usernameEditText = findViewById<EditText>(R.id.ussername)
        val emailEditText = findViewById<EditText>(R.id.email)
        val passwordEditText = findViewById<EditText>(R.id.password)
        val repeatpasswordEditText = findViewById<EditText>(R.id.repeatpassword)
        val registerButton = findViewById<Button>(R.id.registrar)
        val loginButton = findViewById<Button>(R.id.iniciarsesion)

        registerButton.setOnClickListener {
            val enteredUsername = usernameEditText.text.toString()
            val enteredEmail = emailEditText.text.toString()
            val enteredPassword = passwordEditText.text.toString()
            val enteredRepeatPassword = repeatpasswordEditText.text.toString()

            // validar username, email, password y repeat password
            if (enteredUsername.isEmpty()) {
                usernameEditText.error = "Please enter a username"
                usernameEditText.requestFocus()
                return@setOnClickListener
            }

            if (enteredEmail.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(enteredEmail).matches()) {
                emailEditText.error = "Please enter a valid email address"
                emailEditText.requestFocus()
                return@setOnClickListener
            }

            if (enteredPassword.isEmpty() || enteredPassword.length < 6) {
                passwordEditText.error = "Password needs to have at least 6 characters"
                passwordEditText.requestFocus()
                return@setOnClickListener
            }

            if (enteredPassword != enteredRepeatPassword) {
                passwordEditText.error = "Passwords don't match"
                passwordEditText.requestFocus()
                return@setOnClickListener
            }


            // Si se pasan todos los if se navega hacia el bienvenida
            val intent = Intent(this, bienvenida_activity::class.java)
            startActivity(intent)

            // registro fue successful
            Toast.makeText(this, "Successful register", Toast.LENGTH_SHORT).show()
        }

        loginButton.setOnClickListener{
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}