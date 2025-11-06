// Variables globales

var facturas = [];
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
    LISTA_DE_FACTURAS.innerHTML += '<option value="' + factura.getAsunto() + '">' + factura.getAsunto() + '</option>';
    MENSAJES.innerHTML = facturas.length + ' factura(s)';
}

function enviar_error(mensajeError) {
    MENSAJES.innerHTML = mensajeError;
}