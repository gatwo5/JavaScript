// ===========
// --- DOM ---
// ===========

DOM = {
    coordenadas: document.getElementById("coordenadas"),
    mapa: document.getElementById("map"),
    latitud: document.getElementById("latitud"),
    longitud: document.getElementById("longitud")
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
    
    DOM.latitud.innerHTML = `X: ${latitud}`;
    DOM.longitud.innerHTML = `Y: ${longitud}`;
}



// ===============
// --- EVENTOS ---
// ===============

map.on('mousemove', hover_mapa);

