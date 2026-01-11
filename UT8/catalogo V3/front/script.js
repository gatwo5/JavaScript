listar_productos();
// ===========
// --- DOM ---
// ===========

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

DOM.btn_agregar_producto.addEventListener("click", async() => {

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
        marcarError(DOM.precio, "error_precio", "Precio inválido");
        return;
    } else {
        limpiarError(DOM.precio, "error_precio");
    }

    // Comprobar imagen

    try {
        await validarImagen(imagenVal);
        limpiarError(DOM.imagen, "error_imagen");
    } catch (err) {
        marcarError(DOM.imagen, 'error_imagen', err);
        return;
    }

    DOM.btn_agregar_producto.disabled = true; // Se deshabilita el botón
    DOM.estado_peticion.textContent = "Guardando...";

    // Creamos producto como variable

    let producto = {
        "id": idVal,
        "nombre": nombreVal,
        "descripcion": descripcionVal, 
        "precio": precioVal,
        "imagen": imagenVal,
        "accion": "guardar"
    };

    // Conectarse al servidor y esperar respueseta
    const resultado = await guardar_producto(producto);

    // Imprimir los productos 
    if (resultado.success) {
        listar_productos();
    }
});

// ======================
// --- CONEXIONES PHP ---
// ======================

// --- Guardar producto ---

async function guardar_producto(producto) {
    const response = await fetch("api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(producto)
    });

    const data = await response.json();

    if (data.success) {
        DOM.estado_peticion.textContent = data.message;
    } else {
        marcarError(DOM.id, "error_id", data.error);
        DOM.estado_peticion.textContent = "";
    }

    DOM.btn_agregar_producto.disabled = false;
    return data;
}


// --- BUSCAR TODOS LOS PRODUCTOS ---

async function listar_productos() {
    const response = await fetch("api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ accion: "listar" })
    });

    const data = await response.json();

    if (data.success) {
        imprimir_productos(data.productos);
    }
}

// --- BUSCAR UN PRODUCTO POR ID ---

async function buscar_producto(producto) {
    const response = await fetch("api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(producto)
    });

    const data = await response.json();

    if (data.success) {
        return data.detalles_producto[0];
    }
}

// ==========================
// --- IMPRIMIR PRODUCTOS ---
// ==========================

// --- IMPRIMIR TODOS LOS PRODUCTOS ---

function imprimir_productos(productos) {
    DOM.grid_productos.innerHTML = '';

    productos.forEach(producto => {
        card = document.createElement('div');
        card.className = 'carta_producto';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.id}">
            <span>${producto.nombre}</span>
        `;
        DOM.grid_productos.appendChild(card);
    });

    // Actualizar el numero de productos
    contador_productos.innerHTML =  DOM.grid_productos.querySelectorAll('img').length;
}

// --- IMPRIMIR LOS DETALLES DEL PRODUCTO

function imprimir_detalles_producto(producto) {

    DOM.info_producto.innerHTML = `
    <h4>${producto.nombre}</h4>
    <p><b>ID:</b> ${producto.id}</p>
    <p><b>Precio:</b> ${producto.precio} €</p>
    <p><b>Descripción:</b> ${producto.descripcion || '—'}</p>
    <img src="${producto.imagen}" width="80">
    `;

}

// ===============
// --- ERRORES ---
// ===============

function marcarError(campo, spanId, msg) {
    campo.style.borderColor = 'red';
    document.getElementById(spanId).textContent = msg;
}

function limpiarError(campo, spanId) {
    campo.style.borderColor = '';
    document.getElementById(spanId).textContent = '';
}

// ====================================
// --- CLICK EN IMAGEN DEL PRODUCTO ---
// ====================================

grid_productos.addEventListener('mousedown', async (e) => {

    if (e.target.tagName === "IMG") {

        // Extrae la ID del producto 

        const id = e.target.alt;

        // Click izquierdo => Mostrar propiedades

        if (e.button === 0) {
            const id_producto = {
                "id": id,
                "accion": "buscar_un_producto"
            };

            const detalles_producto = await buscar_producto(id_producto);

            imprimir_detalles_producto(detalles_producto);
        }

        // Click derecho => Eliminar producto

        else if (e.button === 2) {
            listar_productos();
        }
    }

})

// --- VALIDAR IMAGEN ---

function validarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject("La imagen no se puede cargar");
    img.src = url;
  });
}