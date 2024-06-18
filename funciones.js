Class Sistema:
//Variable que guarda el valor maximo obtenido por un jugador  
let Max = 0;

//Variable que guarda el puntaje total de esta partida
let puntajePartida = 0;

//Funcion que al iniciar la pagina consulte si se desea cargar o no datos. Si lo desea guarda todos los temas (clas Tema) y todas las preguntas (class Pregunta) presentes (Asumir datos validos).
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
//Funcion que lista todos los temas
//Funcion que calcula el promedio de temas con dos decimales (CantPre/CantTemas)
//Funcion que lista los temas sin preguntas 
//Funcion que recibe un tema, un nivel, un texto de la pregunta, una respuesta correcta y un string con respuestas incorrectas. Comprobar: que el nivel sea de 1 al 5, que no exista otra pregunta con el mismo texto y que la respuesta correcta no este entre las incorrectas (respuestas incorrectas separadas con coma). Si cumple todas ellas crear la pregunta (class Pregunta).
//Funcion que calcula el total de preguntas registradas.
//Variable que guarda el valor maximo obtenido por un jugador  
//Funcion que calcula el puntaje obtenido y lo compara con el maximo puntaje obtenido por un jugador y de ser mayor, lo cambia por el nuevo maximo
//Funcion que lista las preguntas segun su nombre en orden alfabtico y sus niveles de mayor a menor
//Funcion que lista las preguntas segun su nombre en orden opuesto al alabetico y sus niveles de mayor a menor
//Funcion que recibe un tema y un nivel. Comprueba que existan preguntas con ese nivel, si no las hay lo avisa. Si hay separa todas las preguntas que tengan ese tema y ese nivel y aleatorizan su orden de aparición y orden de respuestas (No se deben repetir preguntas).
//Variable que guarda el puntaje total de esta partida
//Funcion que recibe una respuesta. Comprueba si la respuesta es correcta, si lo es, ilumina la respuesta correcta de verde, produce un sonido, aumenta en 10 el puntaje total de esta partida y no permite que se vuelva a seleccionar otro boton. Si es incorrecta ilumina la respuesta de color rojo, produce un sonido (distinto al de la respuesta correcta), resta en 1 el total de putaje de esta partida e impide que se vuelva a ocar el mismo boton.
//Funcion que al presionar el boton de "Ayuda" muestra el 1er caracter de la respuesta
//Funcion que al presionar el boton de "Siguiente Pregunta" comprueba si hay otra pregunta, si la hay, muestra otra pregunta, si no la hay termina la partida.
//Funcion que al presionar el boton de "Terminar" muestra en una ventana emergente el puntaje logradoy se vuelve a la configuración del juego
//Funcion que si durante el juego se accede a otras pestañas de la página, se considera que se termina el juego


class tema {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

class Pregunta {
    constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.nivel = nivel;
        this.tema = tema;
    }
  
