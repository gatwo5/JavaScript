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