document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".sidebar nav a");
  const modulos = document.querySelectorAll(".modulo");

  function ocultarTodo() {
    modulos.forEach(mod => mod.style.display = "none");
  }

  function mostrarModulo(clave) {
    ocultarTodo();
    const modulo = document.querySelector(`.modulo[data-section="${clave}"]`);
    if (modulo) {
      modulo.style.display = "block";

      // Cargar datos al mostrar
      switch (clave) {
        case "monedas":
          listarMonedas();
          break;
        case "bancos":
          listarBancos();
          break;
        case "plazas":
          listarPlazas();
          break;
        case "activos":
          listarTiposActivo();
          break;
        case "bovedas":
          break;
      }
    }
  }
  // Manejar clicks en el menú
  menuLinks.forEach(link => {
    const seccion = link.getAttribute("data-section");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (seccion) mostrarModulo(seccion);
    });
  });

  // Mostrar el primer módulo por defecto
  const primero = menuLinks[0].getAttribute("data-section");
  if (primero) {
    mostrarModulo(primero);
  }
});

function ejecutarDesdeInput() {
    const id = parseInt(document.getElementById("transaccion-id").value);
    if (!isNaN(id)) {
        ejecutarTransaccion(id);
    } else {
        alert("❌ ID de transacción inválido");
    }
}

function detalleDesdeInput() {
    const id = parseInt(document.getElementById("detalle-id").value);
    if (!isNaN(id)) {
        detalleTransaccion(id);
    } else {
        alert("❌ ID de transacción inválido");
    }
}

// Sobreescribir detalleTransaccion para usar <pre>
async function detalleTransaccion(id = 0) {
    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ op: "detalle_transaccion", id })
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }

        const data = await res.json();
        const output = document.getElementById("detalle-transaccion-output");
        output.textContent = JSON.stringify(data, null, 2);

    } catch (error) {
        alert(`❌ Error al obtener detalle: ${error.message}`);
    }
}
