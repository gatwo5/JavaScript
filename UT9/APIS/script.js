// ==========================
// --- VARIABLES GLOBALES ---
// ==========================

var marcadores = JSON.parse(localStorage.getItem('marcadores'));

// ===========
// --- DOM ---
// ===========

DOM = {
    coordenadas: document.getElementById("coordenadas"),
    mapa: document.getElementById("map"),
    latitud: document.getElementById("latitud"),
    longitud: document.getElementById("longitud"),
    ubicaciones: document.getElementById("ubicaciones")
};



// ============
// --- MAPA ---
// ============

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// =================
// --- FUNCIONES ---
// =================

function hover_mapa(e) {
    const latitud = e.latlng.lat.toFixed(6);
    const longitud = e.latlng.lng.toFixed(6);
    
    DOM.latitud.innerHTML = latitud;
    DOM.longitud.innerHTML = longitud;
}

function agregar_marcador(e) {
    const latitud = e.latlng.lat;
    const longitud = e.latlng.lng;

    // JSON para pasar a localstorage

    const latlang = {
        lat: latitud,
        lon: longitud
    }

    // Se agrega el marcador 

    L.marker([latitud,longitud]).addTo(map);

    // Se guarda el marcador en localStorage

    if (marcadores !== null) {
        marcadores.push(latlang);
    } else {
        marcadores = [latlang];
    }

    localStorage.setItem('marcadores', JSON.stringify(marcadores));

    // Actualizar canvas

    agregar_ubicacion_canvas();
}

function agregar_ubicacion_canvas() {
    marcador = marcadores[marcadores.length - 1];

    ctx.font = "20px Arial";
    ctx.fillText( orden_marcadores + "º " + [marcador.lat, marcador.lon], 20, 100 + y);
    y+= 25;
    orden_marcadores++;
}

function mostrar_todos_marcadores() {
    if (marcadores !== null) {
        marcadores.forEach(marcador => {
            L.marker([marcador.lat, marcador.lon]).addTo(map);
        })
    }
}

// ==============
// --- CANVAS ---
// ==============

let y = 0;
let orden_marcadores = 1;
const ctx = DOM.ubicaciones.getContext("2d");

function mostrar_ubicaciones_canvas() {
    if (marcadores !== null) {
        marcadores.forEach(marcador => {
            ctx.font = "20px Arial";
            ctx.fillText( orden_marcadores + "º " + [marcador.lat, marcador.lon], 20, 100 + y);
            y+= 25;
            orden_marcadores++;
        })
    }
}


// ===============
// --- EVENTOS ---
// ===============

map.on('mousemove', hover_mapa);
map.on('click', agregar_marcador);

// ===========================
// --- AL CARGAR LA PÁGINA ---
// ===========================

mostrar_todos_marcadores();
mostrar_ubicaciones_canvas()
