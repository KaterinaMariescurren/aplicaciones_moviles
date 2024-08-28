package com.example.login

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class bienvenida_activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_bienvenida)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val ussername = intent.getStringExtra("name")

        val bienvenidaTextView = findViewById<TextView>(R.id.bienvenida)

        bienvenidaTextView.text = String.format("Bienvenido %s a App Móvil", ussername)

        val androidButton: Button = findViewById(R.id.androidButton)
        val iosButton: Button = findViewById(R.id.iosButton)
        val logoImageView: ImageView = findViewById(R.id.logoImageView)

        androidButton.setOnClickListener {
            logoImageView.setImageResource(R.drawable.android_icono)
        }

        iosButton.setOnClickListener {
            logoImageView.setImageResource(R.drawable.ios_icono)
        }
        // Funcionalidad para mostrar el EditText cuando se selecciona el CheckBox "Otra"
        val checkboxOtra: CheckBox = findViewById(R.id.checkbox_otra)
        val edittextOther: EditText = findViewById(R.id.edittext_other)

        // Configurar el OnCheckedChangeListener para el CheckBox "Otra"
        checkboxOtra.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                edittextOther.visibility = View.VISIBLE
            } else {
                edittextOther.visibility = View.GONE
            }
        }
    }
}