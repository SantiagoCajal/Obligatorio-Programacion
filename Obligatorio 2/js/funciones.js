var sonidoCorrecto = new Audio("sounds/videoplayback (1).weba");
var sonidoIncorrecto = new Audio("sounds/videoplayback.weba");

function comprobarRespuesta(respuesta) {
    var correcta = "París";
    var puntajePartida = document.getElementById("puntajePartida");
    var puntaje = parseInt(puntajePartida.textContent);

    if (respuesta === correcta) {
        sonidoCorrecto.play();
        puntaje += 10; 
    } else {
        sonidoIncorrecto.play(); 
        puntaje -= 1; 
    }

    puntajePartida.textContent = puntaje; // Actualizar puntaje en la interfaz
}

// Definimos la clase Tema
class Tema {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

// Array para almacenar los temas
var temas = [];

// Función para crear un nuevo tema
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
        // Actualizar la lista de temas y el contador de temas
        actualizarListaYContadorTemas();
        // Actualizar opciones de temas en el formulario de preguntas
        actualizarOpcionesTemas();
        return nuevoTema;
    }
}

// Función para actualizar la lista de temas y el contador de temas
function actualizarListaYContadorTemas() {
    // Actualizamos la lista de temas
    actualizarListaTemas();
    // Actualizamos el contador de temas
    actualizarContadorTemas();
}

// Función para actualizar la lista de nombres de temas
function actualizarListaTemas() {
    var listaTemasElemento = document.getElementById('listaTemas');
    // Limpiamos la lista antes de agregar los nuevos temas
    listaTemasElemento.innerHTML = '';
    // Recorremos el array de temas y agregamos cada nombre a la lista
    temas.forEach(function(tema) {
        var li = document.createElement('li');
        li.textContent = tema.nombre;
        listaTemasElemento.appendChild(li);
    });

    // Si no hay temas, agregamos un elemento de "Sin datos"
    if (temas.length === 0) {
        var li = document.createElement('li');
        li.textContent = 'Sin datos';
        listaTemasElemento.appendChild(li);
    }
}

// Función para actualizar el contador de temas
function actualizarContadorTemas() {
    var contadorElemento = document.getElementById('contadorTemas');
    contadorElemento.textContent = `Lista de temas (total de temas: ${temas.length})`;
}

// Función para actualizar las opciones del select de temas en el formulario de preguntas
function actualizarOpcionesTemas() {
    var selectTemas = document.getElementById('idTemas');
    // Limpiamos las opciones existentes
    selectTemas.innerHTML = '';

    // Creamos y añadimos una opción por cada tema en el array de temas
    temas.forEach(function(tema) {
        var option = document.createElement('option');
        option.value = tema.nombre;
        option.textContent = tema.nombre;
        selectTemas.appendChild(option);
    });

    // Si no hay temas, agregamos una opción predeterminada
    if (temas.length === 0) {
        var option = document.createElement('option');
        option.textContent = 'No hay temas disponibles';
        selectTemas.appendChild(option);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Capturamos el formulario por su ID
    var form = document.querySelector('form');

    // Escuchamos el evento 'submit' del formulario
    form.addEventListener('submit', function(event) {
        // Evitamos el envío del formulario que causa la recarga de la página
        event.preventDefault();

        // Capturamos los valores de los campos nombre y descripción del formulario
        var nombre = document.getElementById('idNombre').value;
        var descripcion = document.getElementById('idDescripcion').value;

        // Llamamos a la función crearTema para crear un nuevo tema
        var resultado = crearTema(nombre, descripcion);

        // Manejamos el resultado según sea necesario (por ejemplo, mostrando un mensaje)
        console.log(resultado);

        // Puedes resetear el formulario después de crear el tema si lo deseas
        form.reset();
    });

    // Función inicial para actualizar la lista de temas y el contador de temas al cargar la página
    actualizarListaYContadorTemas();
});

class Pregunta {
    constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.nivel = nivel;
        this.tema = tema;
    }
}

function crearPregunta(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
    // Verificar si ya existe una pregunta con el mismo texto
    let preguntaExistente = preguntas.find(p => p.texto === texto);

    if (preguntaExistente) {
        return "Ya existe una pregunta con ese texto";
    }

    // Verificar si el tema existe
    let temaExistente = temas.find(t => t.nombre === tema);

    if (!temaExistente) {
        return "El tema no existe";
    }

    // Verificar que el nivel esté entre 1 y 5
    if (nivel < 1 || nivel > 5) {
        return "El nivel debe estar entre 1 y 5";
    }

    // Verificar que la respuesta correcta no esté entre las respuestas incorrectas
    let respuestasIncorrectasArray = respuestasIncorrectas.split(",").map(r => r.trim());
    if (respuestasIncorrectasArray.includes(respuestaCorrecta)) {
        return "La respuesta correcta no puede estar entre las respuestas incorrectas";
    }

    // Crear una nueva instancia de Pregunta
    let nuevaPregunta = new Pregunta(texto, respuestaCorrecta, respuestasIncorrectasArray, nivel, tema);
    // Agregar la nueva pregunta al array de preguntas
    preguntas.push(nuevaPregunta);

    // Devolver la pregunta creada (opcional)
    return nuevaPregunta;
}

document.addEventListener('DOMContentLoaded', function() {
    var formularioPregunta = document.getElementById('formularioPregunta');
    var totalPreguntasElemento = document.getElementById('totalPreguntas');

    formularioPregunta.addEventListener('submit', function(event) {
        event.preventDefault();

        var tema = document.getElementById('idTemas').value;
        var nivel = parseInt(document.getElementById('idNivel').value);
        var texto = document.getElementById('idTextoP').value;
        var respuestaCorrecta = document.getElementById('idRespC').value;
        var respuestasIncorrectas = document.getElementById('idRespI').value;

        // Llamamos a la función crearPregunta para crear una nueva pregunta
        var resultado = crearPregunta(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema);

        // Verificamos si se creó la pregunta correctamente
        if (typeof resultado === 'object' && resultado instanceof Pregunta) {
            // Actualizamos el total de preguntas registradas
            totalPreguntasElemento.textContent = `Total de preguntas registradas: ${preguntas.length} preguntas`;
        } else {
            // Si hay algún error, podrías manejarlo aquí si lo deseas
            console.error(resultado); // Mostrar en consola el mensaje de error
        }

        // Puedes limpiar el formulario después de crear la pregunta si lo deseas
        formularioPregunta.reset();
    });

    // Aquí puedes agregar más lógica si necesitas actualizar dinámicamente el select de temas, etc.
});

document.addEventListener('DOMContentLoaded', function () {
    const formAltaTemas = document.getElementById('formAltaTemas');
    const formAltaPreguntas = document.getElementById('formAltaPreguntas');
    const idTemasSelect = document.getElementById('idTemas');
    const idTemasESelect = document.getElementById('idTemasE');
    const listaTemas = document.getElementById('listaTemas');
    const tablaPreguntas = document.getElementById('tablaPreguntas');
    const totalTemas = document.getElementById('totalTemas');
    const promedioPreguntas = document.getElementById('promedioPreguntas');
    const totalPreguntas = document.getElementById('totalPreguntas');
    const temasSinPreguntar = document.getElementById('temasSinPreguntar');

    let temas = [];
    let preguntas = [];

    formAltaTemas.addEventListener('submit', function (event) {
        event.preventDefault();
        const nombre = document.getElementById('idNombre').value.trim();
        const descripcion = document.getElementById('idDescripcion').value.trim();

        if (temas.some(t => t.nombre === nombre)) {
            alert('El nombre del tema ya existe.');
            return;
        }

        const tema = { nombre, descripcion };
        temas.push(tema);
        actualizarTemas();
        formAltaTemas.reset();
    });

    formAltaPreguntas.addEventListener('submit', function (event) {
        event.preventDefault();
        const tema = document.getElementById('idTemas').value;
        const nivel = parseInt(document.getElementById('idNivel').value);
        const textoPregunta = document.getElementById('idTextoP').value.trim();
        const respuestaCorrecta = document.getElementById('idRespC').value.trim();
        const respuestasIncorrectas = document.getElementById('idRespI').value.trim().split(',');

        if (preguntas.some(p => p.textoPregunta === textoPregunta)) {
            alert('El texto de la pregunta ya existe.');
            return;
        }

        if (respuestasIncorrectas.includes(respuestaCorrecta)) {
            alert('La respuesta correcta no puede estar en las respuestas incorrectas.');
            return;
        }

        const pregunta = { tema, nivel, textoPregunta, respuestaCorrecta, respuestasIncorrectas };
        preguntas.push(pregunta);
        actualizarPreguntas();
        formAltaPreguntas.reset();
    });

    function actualizarTemas() {
        listaTemas.innerHTML = '';
        idTemasSelect.innerHTML = '';
        idTemasESelect.innerHTML = '';
        temasSinPreguntar.innerHTML = '';
        temas.forEach((tema, index) => {
            const li = document.createElement('li');
            li.textContent = tema.nombre;
            listaTemas.appendChild(li);

            const option = document.createElement('option');
            option.value = tema.nombre;
            option.textContent = tema.nombre;
            idTemasSelect.appendChild(option);

            const optionE = document.createElement('option');
            optionE.value = tema.nombre;
            optionE.textContent = tema.nombre;
            idTemasESelect.appendChild(optionE);

            const liSinPreguntar = document.createElement('li');
            liSinPreguntar.textContent = tema.nombre;
            temasSinPreguntar.appendChild(liSinPreguntar);
        });

        totalTemas.textContent = `Lista de temas (total de temas: ${temas.length})`;

        if (temas.length === 0) {
            listaTemas.innerHTML = '<li>Sin datos</li>';
            temasSinPreguntar.innerHTML = '<li>Sin datos</li>';
        }

        actualizarPromedioPreguntas();
    }

    function actualizarPreguntas() {
        tablaPreguntas.innerHTML = '';
        preguntas.forEach((pregunta, index) => {
            const tr = document.createElement('tr');
            tr.classList.add(`tema-${index % 5 + 1}`); // Colores de fondo

            const tdTema = document.createElement('td');
            tdTema.textContent = pregunta.tema;
            tr.appendChild(tdTema);

            const tdNivel = document.createElement('td');
            tdNivel.textContent = pregunta.nivel;
            tr.appendChild(tdNivel);

            const tdTexto = document.createElement('td');
            tdTexto.textContent = pregunta.textoPregunta;
            tr.appendChild(tdTexto);

            const tdCorrecta = document.createElement('td');
            tdCorrecta.textContent = pregunta.respuestaCorrecta;
            tr.appendChild(tdCorrecta);

            const tdIncorrectas = document.createElement('td');
            tdIncorrectas.textContent = pregunta.respuestasIncorrectas.join(', ');
            tr.appendChild(tdIncorrectas);

            tablaPreguntas.appendChild(tr);
        });

        if (preguntas.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="5">Sin datos</td>';
            tablaPreguntas.appendChild(tr);
        }

        totalPreguntas.textContent = `Total de preguntas registradas: ${preguntas.length} preguntas`;

        actualizarPromedioPreguntas();
        actualizarTemasSinPreguntar();
    }

    function actualizarPromedioPreguntas() {
        if (temas.length > 0) {
            const promedio = (preguntas.length / temas.length).toFixed(2);
            promedioPreguntas.textContent = `Promedio de preguntas por tema: ${promedio}`;
        } else {
            promedioPreguntas.textContent = 'Promedio de preguntas por tema: sin datos';
        }
    }

    function actualizarTemasSinPreguntar() {
        const temasConPreguntas = preguntas.map(p => p.tema);
        const temasSinPreg = temas.filter(t => !temasConPreguntas.includes(t.nombre));

        temasSinPreguntar.innerHTML = '';
        if (temasSinPreg.length > 0) {
            temasSinPreg.forEach(t => {
                const li = document.createElement('li');
                li.textContent = t.nombre;
                temasSinPreguntar.appendChild(li);
            });
        } else {
            temasSinPreguntar.innerHTML = '<li>Sin datos</li>';
        }
    }
});
