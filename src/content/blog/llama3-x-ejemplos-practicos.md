---
draft: false
title: "Descubre cómo integrar herramientas con Llama 3.x: Ejemplos prácticos"
snippet: "En este blog, te mostraré cómo utilizar function calling en Llama 3.1 para integrar varias herramientas útiles como la evaluación de expresiones matemáticas, el pronóstico del clima, y las búsquedas en Wikipedia. Utilizaremos el modelo de lenguaje para que decida automáticamente qué herramienta usar basándose en la consulta que se le haga. Además, te guiaré paso a paso para configurar las API y utilizar servicios gratuitos."
image: {
    src: "https://raw.githubusercontent.com/dailynauta/dailynauta.github.io/main/public/blogimg/functioncalling.png",
    alt: "AI, Ollama, Llama, Python"
}
publishDate: "2024-09-06 01:39"
category: "Inteligencia Artificial"
author: "devjaime"
tags: [IA, Ollama, Llama, Python]
---

# <div class="text-gray-300">Descubre cómo integrar herramientas con Llama 3.1: Ejemplos prácticos</div> 

En este blog, te mostraré cómo utilizar function calling en Llama 3.1 para integrar varias herramientas útiles como la evaluación de expresiones matemáticas, el pronóstico del clima, y las búsquedas en Wikipedia. Utilizaremos el modelo de lenguaje para que decida automáticamente qué herramienta usar basándose en la consulta que se le haga. Además, te guiaré paso a paso para configurar las API y utilizar servicios gratuitos.

* ¿Qué es function calling en Llama 3.1?
Function calling permite al modelo de lenguaje ejecutar funciones específicas cuando recibe una consulta que coincide con los parámetros de esa función. En este caso, configuraremos el modelo para que decida si usar una función para evaluar expresiones matemáticas, consultar el clima o hacer búsquedas en Wikipedia.

* Paso 1: Preparación del entorno
Primero, vamos a instalar las dependencias necesarias para este proyecto. Utilizaremos la librería ollama para interactuar con Llama 3.1, junto con algunas librerías adicionales como requests para acceder a APIs y wikipedia-api para realizar búsquedas en Wikipedia.

```python
pip install ollama wikipedia-api requests
```

## <div class="text-gray-300">Configurando el evaluador de expresiones matemáticas</div> 

Esta será la primera función que añadiremos al modelo. Utilizaremos la función incorporada eval() de Python para calcular expresiones matemáticas que el modelo identificará en las consultas.

Código para la herramienta de evaluación de expresiones:
```python
def evaluador_de_expresiones(expresion=""):
    try:
        resultado = eval(expresion)
        return {"resultado": resultado}
    except Exception as e:
        return {"error": str(e)}

```
Esta función toma una expresión matemática como cadena y devuelve el resultado. Si hay un error en la expresión (como una sintaxis incorrecta), devuelve el error.

### <div class="text-gray-300">Integración del pronóstico del clima utilizando una API gratuita</div> 

Utilizaremos la API gratuita de OpenWeatherMap para obtener el pronóstico del clima. Primero, debes registrarte en OpenWeatherMap para obtener una API key gratuita.

Código para la herramienta de pronóstico del clima:


```python
import requests

def obtener_clima(ciudad):
    api_key = "TU_API_KEY_DE_OPENWEATHER"
    url = f"http://api.openweathermap.org/data/2.5/weather?q={ciudad}&appid={api_key}&units=metric&lang=es"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        clima = {
            "temperatura": data["main"]["temp"],
            "descripcion": data["weather"][0]["description"],
            "humedad": data["main"]["humidity"]
        }
        return {"clima": clima}
    else:
        return {"error": "Ciudad no encontrada"}

```
Recuerda reemplazar "TU_API_KEY_DE_OPENWEATHER" con tu propia clave de API. Esta función hace una solicitud a OpenWeatherMap para obtener la temperatura, descripción y humedad de una ciudad específica.

## <div class="text-gray-300">Realizando búsquedas en Wikipedia con la API</div> 

Para las búsquedas en Wikipedia, utilizaremos la librería wikipedia-api, que es simple y permite obtener resúmenes de artículos.

Código para la herramienta de búsqueda en Wikipedia:
```python
import wikipediaapi

def buscar_en_wikipedia(consulta):
    wiki_wiki = wikipediaapi.Wikipedia('es')
    page = wiki_wiki.page(consulta)
    
    if page.exists():
        return {"titulo": page.title, "resumen": page.summary[:300]}  # Limitamos a 300 caracteres el resumen
    else:
        return {"error": "No se encontró ningún resultado para la consulta."}

```
Este código busca en Wikipedia en español y devuelve el título y un resumen de hasta 300 caracteres del artículo encontrado.


### <div class="text-gray-300">Integrando todas las herramientas en function calling de Llama 3.1</div> 

Ahora que tenemos nuestras funciones creadas, es momento de integrarlas con Llama 3.1 usando la librería ollama. El modelo decidirá cuándo llamar a cada herramienta en función de la consulta del usuario.

Código para integrar todas las herramientas:

```python
import ollama

def tool_calling(query):
    # Definimos las herramientas que va a usar el modelo
    tools = [
        {"name": "evaluador_de_expresiones", "function": evaluador_de_expresiones},
        {"name": "obtener_clima", "function": obtener_clima},
        {"name": "buscar_en_wikipedia", "function": buscar_en_wikipedia}
    ]
    
    # Enviamos la consulta al modelo
    response = ollama.chat(
        model="llama-3.1",
        tools=tools,
        query=query
    )
    
    # Procesamos la respuesta
    return response

```

Al enviarle una consulta al modelo, este decidirá automáticamente si debe usar el evaluador de expresiones, el pronóstico del clima o la búsqueda en Wikipedia, dependiendo de lo que se le pregunte.

<div class="text-gray-300">Ejemplos en acción</div>
1.- Evaluación de expresiones matemáticas:
Consulta: "¿Cuánto es 11 + 2 elevado a 3?"

```python
tool_calling("¿Cuánto es 11 + 2 elevado a 3?")
```


* Respuesta del modelo: "El resultado es 19."


2.- Pronóstico del clima:
Consulta: "¿Cuál es el pronóstico del clima para Santiago de Chile?"

```python
tool_calling("¿Cuál es el pronóstico del clima para Santiago de Chile?")
```
* Respuesta del modelo: "La temperatura actual en Santiago es de 10.8 grados Celsius."
3.- Búsqueda en Wikipedia:
```python
tool_calling("¿Quién ganó el mundial de fútbol en 2006?")
```
* Respuesta del modelo: "Italia fue el campeón del mundial de fútbol de 2006."

<div class="text-gray-300">Conclusiones y próximas mejoras</div>

En este blog, hemos creado un sistema basado en function calling con Llama 3.1, permitiendo que el modelo seleccione la herramienta correcta para responder diferentes tipos de consultas. A través de ejemplos sencillos como la evaluación de expresiones, el pronóstico del clima y las búsquedas en Wikipedia, hemos demostrado cómo integrar estas herramientas con APIs gratuitas.

Si estás interesado en explorar más sobre function calling o en utilizar otras herramientas personalizadas, ¡anímate a experimentar! Puedes incluso agregar nuevas herramientas para tareas más avanzadas, como la búsqueda de noticias, traducción automática o análisis de sentimientos.

