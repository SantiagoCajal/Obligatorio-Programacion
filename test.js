
function contarTemasSinPreguntas(temas, preguntas) {
    let temasSinPreguntas = temas.filter(tema => {
        return !preguntas.some(pregunta => pregunta.tema === tema);
    });
    return temasSinPreguntas.length;
}

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

class Tema {
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

let temas = [
    new Tema("Matemáticas", "Estudio de los números y las figuras geométricas"),
    new Tema("Historia", "Estudio de los eventos pasados"),
    new Tema("Ciencia", "Estudio del mundo natural")
];

let preguntas = [
    new Pregunta("¿Cuál es la capital de Francia?", "París", ["Londres", "Roma", "Madrid"], 1, temas[1]),
    new Pregunta("¿Cuál es la capital de Italia?", "Roma", ["París", "Londres", "Madrid"], 1, temas[1]),
    new Pregunta("¿En qué año comenzó la Primera Guerra Mundial?", "1914", ["1918", "1920", "1905"], 1, temas[1]),
    new Pregunta("¿Quién fue Simón Bolívar?", "Libertador de América del Sur", ["Poeta", "Ingeniero", "Músico"], 1, temas[1]),
    new Pregunta("¿Qué evento histórico ocurrió en 1492?", "Descubrimiento de América", ["Independencia de España", "Revolución Francesa", "Conquista de México"], 1, temas[1])
];

let temaElegido = temas[1]; // Historia
let nivelElegido = 1; // Nivel 1

let preguntasAleatorizadas = obtenerPreguntasAleatorizadas(temas, preguntas, temaElegido, nivelElegido);

if (preguntasAleatorizadas) {
    console.log(`Preguntas aleatorizadas del tema "${temaElegido.nombre}" y nivel ${nivelElegido}:`);
    preguntasAleatorizadas.forEach(pregunta => {
        console.log(`- ${pregunta.texto}`);
        console.log(`  Respuestas aleatorias: ${pregunta.respuestasAleatorias.join(', ')}`);
    });
}