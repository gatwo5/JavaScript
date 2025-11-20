const botonTarjeta = document.querySelector("#tarjeta");
const div = document.querySelector("div");

// --- CREAR NUEVOS ELEMENTOS ---

// Crear una tarjeta de borde negro al hacer click

botonTarjeta.addEventListener('click', function() {
    // Crear nuevo div
    var nuevo_div = document.createElement("div");

    // Darle contenido
    var nuevo_contenido = document.createTextNode("Tarjeta");

    
    nuevo_div.appendChild(nuevo_contenido);

    document.body.insertBefore(nuevo_div, botonTarjeta.nextSibling);
});

// EVENTLISTENERS DE LAS TARJETAS 

document.body.addEventListener("click", function(e) {
    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = "red";
    }
});