class Sistema {
    constructor(preguntas, temas) {
      this.preguntas = preguntas;
      this.temas = temas;
    }
}

class tema {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

class Pregunta {
    constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.nivel = nivel;
        this.tema = tema;
    }

    obtenerRespuestasAleatorias() {
        let respuestas = [...this.respuestasIncorrectas, this.respuestaCorrecta];
        respuestas.sort(() => Math.random() - 0.5); // Orden aleatorio
        return respuestas;
    }
}

//Variable que guarda el valor maximo obtenido por un jugador  

let max = 0;

//Variable que guarda el puntaje total de esta partida

let puntajePartida = 0;

//Funcion que al iniciar la pagina consulte si se desea cargar o no datos. Si lo desea guarda todos los temas (class Tema) y todas las preguntas (class Pregunta) presentes (Asumir datos validos).

function procesarPreguntas(preguntas, crearInstancias) {
    if (crearInstancias) {
        return preguntas.map(pregunta => new Pregunta(
            pregunta.texto,
            pregunta.respuestaCorrecta,
            pregunta.respuestasIncorrectas,
            pregunta.nivel,
            pregunta.tema
        ));
    } else {
        return preguntas;
    }
}

//Funcion que recibe el nombre de un tema y su descripcion. Comprueba que no exista un Tema con ese nombre, si no existe, crea el tema y su descripcion (class Tema), si existe devolver "El tema ya existe".

function crearTema(nombre, descripcion) {
    // Verificar si el tema ya existe
    let temaExistente = temas.find(tema => tema.nombre === nombre);
    
    if (temaExistente) {
        return "El tema ya existe";
    } else {
        // Crear una nueva instancia de Tema
        let nuevoTema = new Tema(nombre, descripcion);
        // Agregar el nuevo tema al array de temas
        temas.push(nuevoTema);
        return nuevoTema;
    }
}


//Funcion que calcula el total de temas
function contadorTemas(trivia) {
  return trivia.length;
}

//Funcion que lista todos los temas

function listarTemas() {
      let listaTemas = document.getElementById("listaTemas");
      topicsList.innerHTML = ''; // Limpiar la lista antes de agregar los temas

      trivia.forEach(function(item) {
        let topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.textContent = item.topic;
        topicsList.appendChild(topicItem);
      });
    }

//Funcion que calcula el promedio de temas con dos decimales (CantPre/CantTemas)

function calcularPromedio(preguntas, temas) {
    if (temas.getCantidad() === 0) {
      throw new Error("La cantidad de temas no puede ser cero");
    }
    let promedio = preguntas.getCantidad() / temas.getCantidad();
    promedio = Math.round(promedio * 100) / 100; 
    return promedio;
  }

//Funcion que lista los temas sin preguntas 

function contarTemasSinPreguntas(temas, preguntas) {
    let temasSinPreguntas = temas.filter(tema => {
        return !preguntas.some(pregunta => pregunta.tema === tema);
    });
    return temasSinPreguntas.length;
}

//Funcion que recibe un tema, un nivel, un texto de la pregunta, una respuesta correcta y un string con respuestas incorrectas. Comprobar: que el nivel sea de 1 al 5, que no exista otra pregunta con el mismo texto y que la respuesta correcta no este entre las incorrectas (respuestas incorrectas separadas con coma). Si cumple todas ellas crear la pregunta (class Pregunta).

function crearPregunta(temas, preguntas, tema, nivel, texto, respuestaCorrecta, respuestasIncorrectasStr) {
    // Validar el nivel (debe estar entre 1 y 5)
    if (nivel < 1 || nivel > 5) {
        console.error("El nivel debe estar entre 1 y 5.");
        return null;
    }

    // Validar que no exista otra pregunta con el mismo texto
    if (preguntas.some(pregunta => pregunta.texto === texto)) {
        console.error("Ya existe una pregunta con el mismo texto.");
        return null;
    }

    // Convertir las respuestas incorrectas a un array
    let respuestasIncorrectas = respuestasIncorrectasStr.split(",").map(respuesta => respuesta.trim());

    // Validar que la respuesta correcta no esté entre las incorrectas
    if (respuestasIncorrectas.includes(respuestaCorrecta)) {
        console.error("La respuesta correcta no puede estar entre las respuestas incorrectas.");
        return null;
    }

    // Validar que el tema existe
    if (!temas.includes(tema)) {
        console.error("El tema especificado no existe.");
        return null;
    }

    // Crear y devolver la nueva pregunta
    let nuevaPregunta = new Pregunta(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema);
    preguntas.push(nuevaPregunta);
    return nuevaPregunta;
}

//Funcion que calcula el total de preguntas registradas.

function totalPreguntas(preguntas) {
    return preguntas.length;
}


//Funcion que calcula el puntaje obtenido y lo compara con el maximo puntaje obtenido por un jugador y de ser mayor, lo cambia por el nuevo maximo

function actualizarMaximo(max, puntajePartida) {
    if (puntajePartida > max) {
        max = puntajePartida;
    }
}

//Funcion que lista las preguntas segun su tema en orden alfabtico y sus niveles de mayor a menor

function ordenarPreguntas(preguntas) {
    // Ordenar preguntas por tema (orden alfabético) y luego por nivel (mayor a menor)
    preguntas.sort((pregunta1, pregunta2) => {
        // Comparar por nombre del tema (orden alfabético)
        if (pregunta1.tema.nombre < pregunta2.tema.nombre) return -1;
        if (pregunta1.tema.nombre > pregunta2.tema.nombre) return 1;
        
        // Si los temas son iguales, comparar por nivel (mayor a menor)
        return pregunta2.nivel - pregunta1.nivel;
    });

    return preguntas;
}

//Funcion que lista las preguntas segun su nombre en orden opuesto al alabetico y sus niveles de mayor a menor

function ordenarPreguntasInverso(preguntas) {
    // Ordenar preguntas por tema (orden alfabético inverso) y luego por nivel (mayor a menor)
    preguntas.sort((pregunta1, pregunta2) => {
        // Comparar por nombre del tema (orden alfabético inverso)
        if (pregunta1.tema.nombre > pregunta2.tema.nombre) return -1;
        if (pregunta1.tema.nombre < pregunta2.tema.nombre) return 1;
        
        // Si los temas son iguales, comparar por nivel (mayor a menor)
        return pregunta2.nivel - pregunta1.nivel;
    });

    return preguntas;
}

//Funcion que recibe un tema y un nivel. Comprueba que existan preguntas con ese tema y ese nivel, si no las hay lo avisa. Si hay separa todas las preguntas que tengan ese tema y ese nivel y aleatorizan su orden de aparición y orden de respuestas (No se deben repetir preguntas).

function obtenerPreguntasAleatorizadas(temas, preguntas, temaElegido, nivelElegido) {
    // Filtrar preguntas por tema y nivel
    let preguntasFiltradas = preguntas.filter(pregunta => {
        return pregunta.tema === temaElegido && pregunta.nivel === nivelElegido;
    });

    // Verificar si hay preguntas con ese nivel y tema
    if (preguntasFiltradas.length === 0) {
        console.log(`No hay preguntas con el tema "${temaElegido.nombre}" y nivel ${nivelElegido}.`);
        return null;
    }

    // Aleatorizar el orden de aparición de las preguntas
    preguntasFiltradas.sort(() => Math.random() - 0.5);

    // Aleatorizar las respuestas de cada pregunta
    preguntasFiltradas.forEach(pregunta => {
        pregunta.respuestasAleatorias = pregunta.obtenerRespuestasAleatorias();
    });

    return preguntasFiltradas;
}

//Funcion que recibe una respuesta. Comprueba si la respuesta es correcta, si lo es, ilumina la respuesta correcta de verde, produce un sonido, aumenta en 10 el puntaje total de esta partida y no permite que se vuelva a seleccionar otro boton. Si es incorrecta ilumina la respuesta de color rojo, produce un sonido (distinto al de la respuesta correcta), resta en 1 el total de putaje de esta partida e impide que se vuelva a ocar el mismo boton.

//Funcion que al presionar el boton de "Ayuda" muestra el 1er caracter de la respuesta

function mostrarAyuda() {
    // Obtener la primera letra de la respuesta correcta
    let primeraLetra = preguntaActual.respuestaCorrecta.charAt(0);
    
    // Mostrar la primera letra en algún lugar de la interfaz (por ejemplo, en un div)
    let ayudaContainer = document.getElementById("ayuda-container");
    ayudaContainer.textContent = `Primera letra de la respuesta correcta: ${primeraLetra}`;
}

//Funcion que al presionar el boton de "Siguiente Pregunta" comprueba si hay otra pregunta, si la hay, muestra otra pregunta, si no la hay termina la partida.

//Funcion que al presionar el boton de "Terminar" muestra en una ventana emergente el puntaje logradoy se vuelve a la configuración del juego

//Funcion que si durante el juego se accede a otras pestañas de la página, se considera que se termina el juego

let gameInProgress = true;

function finDeTrivia() {
      tEnProgreso = false;
      document.getElementById("estatus-juego").style.display = "none";
      document.getElementById("finDeTrivia").style.display = "block";
}

    document.addEventListener("visibilitychange", function() {
      if (document.hidden && tEnProgreso) {
        finDeTrivia();
      }
    });

  
    function inicioTrivia() {
      tEnProgreso = true;
      document.getElementById("estatus-juego").style.display = "block";
      document.getElementById("finDeTrivia").style.display = "none";
    }

  
    window.onload = startGame;



