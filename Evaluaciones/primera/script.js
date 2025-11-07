// Variables globales

var facturas = [];
var contadorErrores = 0;
const LISTA_DE_FACTURAS = document.getElementById('listaDeFacturas');
const MENSAJES = document.getElementById('mensajes');

// --- class Factura ---

class Factura {

    // --- CONSTRUCTORES ---
    constructor (asunto, fecha, cantidad, tipo) {
        this.asunto = asunto;
        this.fecha = fecha;
        this.cantidad = cantidad;
        this.tipo = tipo;
    }

    // --- MÉTODOS ---

    getAsunto() {
        return this.asunto;
    }

    getTipo() {
        return this.tipo;
    }

    toString() {
        return this.asunto + ':' + this.fecha + ':' + this.cantidad + ':' + this.tipo;
    }
}

// --- FUNCIONES ---

// agregarFactura()

function agregarFactura() {

    // Datos de la factura

    let asunto = document.getElementById("asunto").value;
    let fecha = document.getElementById("fecha").value;
    let cantidad = document.getElementById("cantidad").value;
    let tipo = document.getElementById("tipo").value;
    
    // Expresión regular

    let expresionRegularAsunto = /^[A-Z][A-Za-z0-9 ]{0,9}$/;

    // Variables

    let recorrerFactura = 0;
    let asuntoNoExiste = true;
    let factura;
    let error = false;

    // Validar asunto

    if (expresionRegularAsunto.test(asunto)) {

        while (recorrerFactura < facturas.length && asuntoNoExiste) {

            if (facturas[recorrerFactura].getAsunto() == asunto) {
                asuntoNoExiste = false;
            }

            recorrerFactura++;
        }

        // Crear factura si el asunto no existe

        if (asuntoNoExiste) {
            factura = new Factura(asunto, fecha, cantidad, tipo);
            facturas.push(factura);
            actualizar_lista_facturas(factura);
            guardar_Preferencia_Tipo(tipo);
        }
    }

    else {
        error = true;
    }

    if (!asuntoNoExiste || error) {
        enviar_error('Asunto no valido');
    }

}

function actualizar_lista_facturas(factura) {
    LISTA_DE_FACTURAS.innerHTML += '<option value="' + factura.getAsunto() + '">' + factura.toString() + '</option>';
    MENSAJES.innerHTML = facturas.length + ' factura(s)';
}

// enviar_error(mensajeError). Recibe el mensaje de error a introducir y lo agrega al html

function enviar_error(mensajeError) {
    MENSAJES.innerHTML = mensajeError;
    const selectErrores = document.getElementById("errores");

    contadorErrores++;
    selectErrores.innerHTML = contadorErrores;

    actualizar_errores();
}

// eliminar_Factura().

function eliminar_Factura() {

}

// cookies

// guardar_Preferencia_Tipo(). Guardar la cookie del tipo
function guardar_Preferencia_Tipo(tipo) {
    document.cookie = `tipo=${tipo}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`; 
}

// actualizar_errores(). Guardar la cookie de los errores
function actualizar_errores() {
    document.cookie = `errores=${contadorErrores}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
}

// leerCookie(nombre). Recibe el nombre de la cookie a buscar y devuelve el valor si la encuentra

function leerCookie(nombre) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [clave, valor] = cookie.split("=");
        if (clave === nombre) {
            return valor;
        }
    }
    return null;
}

// Siempre que se recarga la página las cookies aplican su valor al documento

window.addEventListener("load", function() {
    const tipoGuardado = leerCookie("tipo");
    const erroresGuardado = leerCookie("errores");

    if (tipoGuardado) {
        const selectTipo = document.getElementById("tipo");
        selectTipo.value = tipoGuardado;
    }

    if (erroresGuardado) {
        const selectErrores = document.getElementById("errores");
        selectErrores.innerHTML = erroresGuardado;
    }
});