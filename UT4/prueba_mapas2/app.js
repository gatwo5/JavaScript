// Este script gestiona el formulario y el almacenamiento de clientes usando un Map.
// Creamos un Map donde la clave serÃ¡ el ID y el valor un objeto con los datos del cliente.
const clientes = new Map();

// FunciÃ³n abreviada para seleccionar elementos del DOM.
const select = (selector) => document.querySelector(selector);

// Referencias a los elementos de la interfaz.
const lista = select("#lista");
const form = select("#cliente-form");
const mostrarBtn = select("#mostrar");

// Evento: al enviar el formulario se guarda un nuevo cliente en el Map.
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita recargar la pÃ¡gina al enviar el formulario.

  // Capturamos los valores de los campos.
  const id = select("#id").value.trim();
  const nombre = select("#nombre").value.trim();
  const email = select("#email").value.trim();
  const telefono = select("#telefono").value.trim();

  // ValidaciÃ³n bÃ¡sica: ID, nombre y email son obligatorios.
  if (!id || !nombre || !email) {
    alert("Rellena los campos obligatorios");
    return;
  }

  // Guardamos los datos en el Map usando el ID como clave.
  clientes.set(id, { id, nombre, email, telefono });

  // Limpiamos el formulario despuÃ©s de guardar.
  form.reset();
});

// Evento: al pulsar el botÃ³n "Mostrar" se imprimen los clientes ordenados alfabÃ©ticamente.
mostrarBtn.addEventListener("click", () => {
  // Limpiamos la lista actual.
  lista.innerHTML = "";

  // Creamos un array con los valores del Map y lo ordenamos por nombre.
  const ordenados = [...clientes.values()].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  // Recorremos el array ordenado e insertamos cada cliente como un <li>.
  for (const c of ordenados) {
    const li = document.createElement("li");
    li.textContent = `${c.nombre} (${c.id}) - ${c.email} - ${c.telefono}`;
    lista.appendChild(li);
  }
});