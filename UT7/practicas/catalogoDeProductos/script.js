/* ----- Módulo API ----- */
const API = (function() {
    // "Base de datos" privada
    const db = [];

    return {
        // Guarda producto (retraso 2s). Rechaza si ya existe id.
        guardarProducto(producto) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Validación: id único
                    if (db.some(p => p.id === producto.id)) {
                        reject("Error: El ID ya existe");
                        return;
                    }
                    // Guardar (clonamos para evitar referencias externas)
                    db.push(Object.assign({}, producto));
                    resolve("Producto guardado");
                }, 2000);
            });
        },

        // Borra producto (retraso 1.5s). 10% de fallo aleatorio.
        borrarProducto(id) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simular fallo aleatorio 10%
                    if (Math.random() < 0.10) {
                        reject("Error: No se pudo borrar (fallo simulado)");
                        return;
                    }

                    const idx = db.findIndex(p => p.id === id);
                    if (idx === -1) {
                        reject("Error: Producto no encontrado");
                        return;
                    }
                    db.splice(idx, 1);
                    resolve("Producto borrado");
                }, 1500);
            });
        },

        // Método útil para obtener la lista
        listarProductos() {
            // devolvemos copia para que no puedan mutar la "bd" directamente
            return Promise.resolve(db.map(p => Object.assign({}, p)));
        },

        // Obtener 1 producto
        obtenerProducto(id) {
            const p = db.find(x => x.id === id);
            return Promise.resolve(p ? Object.assign({}, p) : null);
        }
    };
})();


/* ----- Integración con la UI ----- */
document.addEventListener("DOMContentLoaded", () => {
    // Selectores
    const botonAbrir = document.getElementById("boton_abrir_formulario");
    const formulario = document.getElementById("formulario_producto");
    const inputId = document.getElementById("id");
    const inputNombre = document.getElementById("nombre");
    const inputDescripcion = document.getElementById("descripcion");
    const inputPrecio = document.getElementById("precio");
    const selectImagen = document.getElementById("ruta_imagen");
    const preview = document.getElementById("preview");
    const mensajes = document.getElementById("mensajes");
    const grid = document.getElementById("grid");
    const info = document.getElementById("informacion_producto");
    const totalDiv = document.getElementById("total_productos");

    // Mostrar/ocultar formulario
    botonAbrir.addEventListener("click", () => {
        formulario.style.display = formulario.style.display === "none" || formulario.style.display === "" ? "block" : "none";
    });

    // Actualizar preview cuando cambie la imagen seleccionada
    selectImagen.addEventListener("change", () => {
        preview.src = selectImagen.value;
    });
    // Inicializar preview
    preview.src = selectImagen.value;

    // Función para refrescar la tabla desde la "API"
    function refrescarTabla() {
        API.listarProductos()
        .then(productos => {
            // Limpiar tabla
            grid.innerHTML = "";

            // Cabecera simple
            const header = document.createElement("tr");
            header.innerHTML = `<th>Id</th><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Acciones</th>`;
            grid.appendChild(header);

            productos.forEach(p => {
                const tr = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = p.id;

                const tdImg = document.createElement("td");
                const img = document.createElement("img");
                img.src = p.ruta_imagen;
                img.width = 75;
                img.height = 75;
                tdImg.appendChild(img);

                const tdNombre = document.createElement("td");
                tdNombre.textContent = p.nombre;

                const tdPrecio = document.createElement("td");
                tdPrecio.textContent = Number(p.precio).toFixed(2) + " €";

                const tdAcc = document.createElement("td");
                const btnBorrar = document.createElement("button");
                btnBorrar.textContent = "Borrar";
                btnBorrar.onclick = () => borrarProductoUI(p.id, btnBorrar);
                tdAcc.appendChild(btnBorrar);

                tr.appendChild(tdId);
                tr.appendChild(tdImg);
                tr.appendChild(tdNombre);
                tr.appendChild(tdPrecio);
                tr.appendChild(tdAcc);

                grid.appendChild(tr);
            });

            // Información adicional
            totalDiv.textContent = `Total productos: ${productos.length}`;
        })
        .catch(err => {
            mensajes.textContent = "Error al listar productos: " + err;
        });
    }

    // Borrar producto desde UI
    function borrarProductoUI(id, boton) {
        boton.disabled = true;
        const originalText = boton.textContent;
        boton.textContent = "Borrando...";

        API.borrarProducto(id)
        .then(msg => {
            mensajes.textContent = msg;
            refrescarTabla();
        })
        .catch(err => {
            mensajes.textContent = err;
        })
        .finally(() => {
            boton.disabled = false;
            boton.textContent = originalText;
        });
    }

    // Añadir producto (función global que tu HTML llama: onclick="agregar_producto()")
    window.agregar_producto = function() {
        // Leer y validar campos
        const idVal = parseInt(inputId.value, 10);
        const nombreVal = inputNombre.value.trim();
        const descripcionVal = inputDescripcion.value.trim();
        const precioVal = parseFloat(inputPrecio.value);
        const rutaVal = selectImagen.value;

        // Validaciones simples (puedes ampliarlas)
        if (!Number.isInteger(idVal) || isNaN(idVal)) {
            mensajes.textContent = "Id inválido (debe ser un número entero).";
            return;
        }
        if (nombreVal === "") {
            mensajes.textContent = "El nombre no puede estar vacío.";
            return;
        }
        if (isNaN(precioVal) || precioVal < 0) {
            mensajes.textContent = "Precio inválido.";
            return;
        }

        const producto = {
            id: idVal,
            nombre: nombreVal,
            descripcion: descripcionVal,
            precio: precioVal,
            ruta_imagen: rutaVal
        };

        // Mostrar estado de guardado
        mensajes.textContent = "Guardando producto...";
        // Deshabilitar el botón para evitar envíos repetidos (buscamos el botón en el formulario)
        const botones = formulario.getElementsByTagName("button");
        const botonAgregar = botones[0];
        if (botonAgregar) botonAgregar.disabled = true;

        // Llamada a la API falsa
        API.guardarProducto(producto)
        .then(msg => {
            mensajes.textContent = msg;
            // Limpiar formulario (opcional)
            inputId.value = "";
            inputNombre.value = "";
            inputDescripcion.value = "";
            inputPrecio.value = "";
            // Refrescar tabla
            refrescarTabla();
        })
        .catch(err => {
            mensajes.textContent = err;
        })
        .finally(() => {
            if (botonAgregar) botonAgregar.disabled = false;
        });
    };

    // Cargar tabla inicialmente
    refrescarTabla();
});
