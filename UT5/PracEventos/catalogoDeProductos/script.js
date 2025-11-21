// Variables globales

var productos = [];
var boton_abrir_formulario = document.querySelector('#boton_abrir_formulario');
const MENSAJES = document.getElementById("mensajes");


// --- Clase Producto ---

class Producto {

    // --- CONSTRUCTOR ---

    constructor(id, nombre, descripcion, precio, ruta_imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ruta_imagen = ruta_imagen;
    }

    // --- MÉTODOS ---

    getId() { return this.id; }
}

function agregar_producto() {

    id = document.getElementById('id').value;
    nombre = document.getElementById('nombre').value;
    descripcion = document.getElementById('descripcion').value;
    precio = document.getElementById('precio').value;
    ruta_imagen = document.getElementById('ruta_imagen').value;
 
    let mensaje_error = '';

    // Validaciones

    if (!nombre) {
        mensaje_error = 'Introduce un nombre';
    }

    else if(!descripcion) {
        mensaje_error = 'Introduce una descripción';
    }

    else if(isNaN(precio) || precio < 0) {
        mensaje_error = 'Precio no válido (Debe ser >= 0)';
    }

    else if(!ruta_imagen) {
        mensaje_error = 'Selecciona una imágen';
    }

    if (mensaje_error) {
        enviar_error(mensaje_error);
        return;
    }

    // Comprobar si existe un producto con esa ID

    const indice_existente = productos.findIndex(f => f.getId() === id);

    if (indice_existente === -1) {
        // Crear producto

        const producto = new Producto(id, nombre, descripcion, precio, ruta_imagen);
        productos.push(producto);
        actualizar_grid_productos();
        mensaje_error = 'Producto creado con éxito';
        enviar_error(mensaje_error);
    }

    else {
        mensaje_error = 'ID ya existente';
        enviar_error(mensaje_error);
    }
}

function enviar_error(mensaje_error) {
    MENSAJES.innerHTML = mensaje_error;
}

function actualizar_grid_productos() {

}

// Click en el botón de añadir producto:

boton_abrir_formulario.addEventListener("click", function() {
    formulario = document.querySelector('#formulario_producto');

    formulario.style.display = 'block';
});