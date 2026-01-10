// --- DOM ---

const DOM = {
    // Selectores globales

    formulario: document.getElementById('formulario_producto'),
    btn_abrir_formulario: document.getElementById('btn_abrir_formulario'),
    grid_productos: document.getElementById('grid_productos'),
    contador_productos: document.getElementById('contador_productos'),
    estado_peticion: document.getElementById('estado_peticion'),
    info_producto: document.getElementById('info_producto'),

    // Selectores del formulario

    id: document.getElementById('id'),
    nombre: document.getElementById('nombre'),
    descripcion: document.getElementById('descripcion'),
    precio: document.getElementById('precio'),
    imagen: document.getElementById('ruta_imagen'),
    btn_agregar_producto: document.getElementById('btn_agregar_producto')
}

// --- ABRIR FORMULARIO ---

DOM.btn_abrir_formulario.addEventListener("click", function(){

    if (DOM.formulario.style.display == "block") {
        DOM.formulario.style.display = "none";
    }

    else {
        DOM.formulario.style.display = "block";
    }
});


// --- AGREGAR PRODUCTO ---

DOM.btn_agregar_producto.addEventListener("click", function() {

    // Leer y validar campos
    idVal = parseInt(DOM.id.value);
    nombreVal = DOM.nombre.value;
    descripcionVal = DOM.descripcion.value;
    precioVal = parseFloat(DOM.precio.value);
    imagenVal = DOM.imagen.value;

    // Validaciones sincronas
    
    if (!Number.isInteger(idVal) || isNaN(idVal)) { // Id
        marcarError(DOM.id, "error_id", "Id inválido (debe ser un número entero)");
        return;
    } else {
        limpiarError(DOM.id, "error_id");
    }

    if (nombreVal === "") { // Nombre
        marcarError(DOM.nombre, "error_nombre", "El nombre no puede estar vacío.");
        return;
    } else {
        limpiarError(DOM.nombre, "error_nombre");
    }

    if (isNaN(precioVal) || precioVal < 0) { // Precio
        marcarError(DOM.precio, "error_precio", "Precio inválido")
        return;
    } else {
        limpiarError(DOM.precio, "error_precio")
    }
});

// --- ERRORES ---

function marcarError(campo, spanId, msg) {
    campo.style.borderColor = 'red';
    document.getElementById(spanId).textContent = msg;
}

function limpiarError(campo, spanId) {
    campo.style.borderColor = '';
    document.getElementById(spanId).textContent = '';
}

// --- VALIDAR IMAGEN ---

function validarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject("La imagen no se puede cargar");
    img.src = url;
  });
}