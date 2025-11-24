// Variables globales

var productos = [];
var boton_abrir_formulario = document.querySelector('#boton_abrir_formulario');
const MENSAJES = document.getElementById("mensajes");

// mostrar preview de img

const sel = document.getElementById('ruta_imagen');
const preview = document.getElementById('preview');


const actualizarPreview = () => {
    preview.src = sel.value;
};

sel.addEventListener('change', actualizarPreview);
actualizarPreview();

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
    getRuta_imagen() { return this.ruta_imagen; }
}

function agregar_producto() {
    document.querySelectorAll("input").forEach(input => {
        input.style.border = "1px solid black";
    });


    id = document.getElementById('id').value;
    nombre = document.getElementById('nombre').value;
    descripcion = document.getElementById('descripcion').value;
    precio = document.getElementById('precio').value;
    ruta_imagen = document.getElementById('ruta_imagen').value;
 
    let mensaje_error = '';

    // Validaciones

    if (!nombre) {
        mensaje_error = 'Introduce un nombre';
        document.querySelector('#nombre').style.border = "1px solid red";
    }

    else if(!descripcion) {
        mensaje_error = 'Introduce una descripción';
        document.querySelector('#descripcion').style.border = "1px solid red";
    }

    else if(isNaN(precio) || precio < 0) {
        mensaje_error = 'Precio no válido (Debe ser >= 0)';
        document.querySelector('#precio').style.border = "1px solid red";
    }

    else if(!ruta_imagen) {
        mensaje_error = 'Selecciona una imágen';
        document.querySelector('#ruta_imagen').style.border = "1px solid red";
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
        enviar_error(mensaje_error)
    }

    else {
        mensaje_error = 'ID ya existente';
        enviar_error(mensaje_error);
        document.querySelector('#id').style.border = "1px solid red";
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