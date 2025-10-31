// --- OBJETOS ---

class Factura {

    // --- CONSTRUCTORES ---
    constructor (asunto, fecha, cantidad, tipo) {
        this.asunto = asunto;
        this.fecha = fecha;
        this.cantidad = cantidad;
        this.tipo = tipo;
    }

    // --- FUNCIONES ---
}

// --- FUNCIONES ---

function agregarFactura() {
    let asunto = document.getElementById("asunto").value;
    let fecha = document.getElementById("fecha").value;
    let cantidad = document.getElementById("cantidad").value;
    let tipo = document.getElementById("tipo").value;
}

function comprobarAsuntoNoRepetido(asunto) {

}