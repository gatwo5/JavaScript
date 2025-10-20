const libros = new Map();
const select = (selector) => document.querySelector(selector);

const lista = select("#lista");
const form = select("#libros-form");
const mostrarBtn = select("#mostrar");

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const titulo = select("#titulo").value.trim();
    const autor = select("#autor").value.trim();
    const anno = select("#anno").value.trim();

    if (!titulo) {
        alert("Titulo obligatorio");
        return;
    }

    libros.set(titulo, {titulo,autor,anno});

    form.reset();
});

mostrarBtn.addEventListener("click", () => {
    lista.innerHTML = "";

    const libros_ordenados = [...libros.values()].sort((a,b) =>
        a.titulo.localeCompare(b.titulo)
    );


    for (const c of libros_ordenados) {
        const li = document.createElement("li");
        li.textContent = `${c.titulo} ${c.autor} ${c.anno}`;
        lista.appendChild(li);
    }
});