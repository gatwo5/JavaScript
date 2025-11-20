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

document.addEventListener("mouseover", function(e) {
    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = "#FFFFBF";
    }
});

document.addEventListener("mouseout", function(e) {
    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = "white";
    }
});

document.body.addEventListener("mousedown", function(e) {
    if (e.target.tagName === "DIV") {

        if(e.button==0) {
            e.target.style.backgroundColor = "#F29559";
            e.target.style.width = '10%';
        }

        else if(e.button==1) {
            e.target.remove();
        }
    }
});

document.body.addEventListener("mouseup", function(e) {
    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = "#FFFFBF";
        e.target.style.width = '10%';
    }
});