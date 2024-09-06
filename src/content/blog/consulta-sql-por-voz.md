---
draft: false
title: "Consulta Sql por Voz utilizando inteligencia artificial"
snippet: "En este blog, exploraremos una prueba de concepto (PoC) para una herramienta innovadora que permite realizar consultas SQL a través de comandos de voz. La idea es que el usuario pueda dictar consultas sin necesidad de escribirlas manualmente, utilizando un enfoque simple que combina la transcripción automática con consultas SQL a una base de datos"
image: {
    src: "https://raw.githubusercontent.com/dailynauta/dailynauta.github.io/main/public/blogimg/vozsql.png",
    alt: "AI, Whisper, Python"
}
publishDate: "2024-09-05 15:39"
category: "Inteligencia Artificial"
author: "devjaime"
tags: [IA, Python, Whisper]
---

# <div class="text-gray-300">Introducción a la PoC: Consultas SQL por Voz</div> 

El desarrollo de soluciones que integran el reconocimiento de voz con automatización ha abierto nuevas posibilidades para mejorar la productividad, especialmente en el ámbito de consultas a bases de datos. Esta PoC aprovecha una funcionalidad en la que, con solo presionar una tecla, el usuario puede grabar su voz, transcribirla automáticamente y realizar consultas SQL directamente desde la transcripción.

## <div class="text-gray-300">¿Cómo Funciona la PoC?</div> 

El sistema está construido en Python y utiliza diversas librerías como Keyboard, pyaudio y una API de inteligencia artificial para transcripción como Grok (basada en Whisper). El flujo del programa es simple:

* Grabación de audio: El usuario presiona una tecla específica (como INS) y empieza a dictar la consulta SQL.
* Transcripción de voz: La voz es grabada y enviada a la API para ser transcrita en texto.
* Ejecución de la consulta SQL: Una vez que se transcribe la voz, se analiza si es una consulta SQL válida y se ejecuta en una base de datos.
* Resultados: El resultado de la consulta se devuelve al usuario de manera eficiente.

### <div class="text-gray-300">Implementación Técnica</div> 

Primero, configuramos un ambiente en Python con las librerías necesarias para manejar la interacción del usuario con el teclado y la grabación de audio. A continuación, se envía el archivo de audio a una API de transcripción, y el resultado se usa para realizar consultas SQL.
```python
import os
import pyaudio
import keyboard
import tempfile
import whisper
from some_sql_library import execute_sql

# Función para grabar el audio
def grabar_audio():
    # Código para grabar audio usando pyaudio
    pass

# Función para guardar el audio como archivo temporal
def guardar_audio(frames, sample_rate):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio_file:
        # Código para guardar el audio en un archivo temporal
        return temp_audio_file.name

# Función para transcribir el audio
def transcribir_audio(audio_path):
    model = whisper.load_model("large")  # Usamos el modelo Whisper
    result = model.transcribe(audio_path)
    return result['text']

# Función para ejecutar la consulta SQL
def ejecutar_consulta_sql(transcripcion):
    # Validar si la transcripción es una consulta SQL válida
    if "SELECT" in transcripcion.upper():
        resultados = execute_sql(transcripcion)
        return resultados
    return "Consulta no válida."

# Función principal
def main():
    while True:
        print("Presiona 'INS' para empezar a grabar...")
        keyboard.wait('insert')
        frames, sample_rate = grabar_audio()
        audio_path = guardar_audio(frames, sample_rate)
        transcripcion = transcribir_audio(audio_path)
        
        if transcripcion:
            print(f"Transcripción: {transcripcion}")
            resultados = ejecutar_consulta_sql(transcripcion)
            print(f"Resultados: {resultados}")
        os.remove(audio_path)

if __name__ == "__main__":
    main()
```


## <div class="text-gray-300">Caso de Uso: Consultas SQL a una Base de Datos/div> 

* El usuario abre la aplicación y dicta una consulta SQL como "Selecciona todos los productos vendidos hoy".
* El sistema transcribe esta consulta y la ejecuta en la base de datos.
* En segundos, el sistema devuelve los resultados de la consulta, mejorando significativamente la eficiencia del proceso.
### <div class="text-gray-300">Beneficios de la PoC</div> 

* Ahorro de tiempo: Los usuarios no necesitan escribir largas consultas SQL, solo dictarlas.
* Accesibilidad: Esta solución facilita el uso de bases de datos a personas con dificultades para escribir o que simplemente prefieren interactuar mediante la voz.
* Integración con herramientas existentes: Al utilizar APIs como Whisper y librerías de Python para manejo de bases de datos, la PoC es altamente adaptable a otros sistemas.
<div class="text-gray-300">Conclusión</div>
Esta PoC es un paso hacia la automatización y la simplificación de las consultas SQL utilizando transcripción de voz, lo que tiene un impacto directo en la productividad. Con la integración de modelos como Whisper y el uso de tecnologías como Python y Grok, el futuro del control de bases de datos puede ser completamente interactivo, por voz, y en tiempo real.
