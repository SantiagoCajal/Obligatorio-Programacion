class Tema {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.preguntas = [];
    }

    agregarPregunta(pregunta) {
        this.preguntas.push(pregunta);
    }
}

class Pregunta {
    constructor(tema, nivel, textoPregunta, respuestaCorrecta, respuestasIncorrectas) {
        this.tema = tema;
        this.nivel = nivel;
        this.textoPregunta = textoPregunta;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
    }
}
