const apiUrl = "http://localhost:5000";

function registrarMoneda() {
    const nombre = document.getElementById("moneda-nombre").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_moneda", nombre })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("moneda-respuesta").innerText = data;
        listarMonedas();
    });
}

function listarMonedas() {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_monedas" })
    })
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("lista-monedas");
        ul.innerHTML = "";
        data.forEach(moneda => {
            const li = document.createElement("li");
            li.innerText = moneda;
            ul.appendChild(li);
        });
    });
}

function registrarBanco() {
    const nombre = document.getElementById("banco-nombre").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_banco", nombre })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("banco-respuesta").innerText = data;
        listarBancos();
    });
}

function listarBancos() {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_bancos" })
    })
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("lista-bancos");
        ul.innerHTML = "";
        data.forEach(banco => {
            const li = document.createElement("li");
            li.innerText = banco;
            ul.appendChild(li);
        });
    });
}
function registrarPlaza() {
    const nombre = document.getElementById("plaza-nombre").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_plaza", nombre })
    }).then(res => res.json());
}

function listarPlazas() {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_plazas" })
    }).then(res => res.json()).then(data => {
        const ul = document.getElementById("lista-plazas");
        ul.innerHTML = "";
        data.forEach(p => {
            const li = document.createElement("li");
            li.innerText = p;
            ul.appendChild(li);
        });
    });
}

function registrarTipoActivo() {
    const nombre = document.getElementById("tipo-activo-nombre").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_tipo_activo", nombre })
    }).then(res => res.json());
}

function listarTiposActivo() {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_tipos_activo" })
    }).then(res => res.json()).then(data => {
        const ul = document.getElementById("lista-tipos-activo");
        ul.innerHTML = "";
        data.forEach(p => {
            const li = document.createElement("li");
            li.innerText = p;
            ul.appendChild(li);
        });
    });
}
function registrarTipoOperacion() {
    const nombre = document.getElementById("tipo-operacion-nombre").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_tipo_operacion", nombre })
    }).then(res => res.json());
}

function listarTiposOperacion() {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_tipos_operacion" })
    }).then(res => res.json()).then(data => {
        const ul = document.getElementById("lista-tipos-operacion");
        ul.innerHTML = "";
        data.forEach(p => {
            const li = document.createElement("li");
            li.innerText = p;
            ul.appendChild(li);
        });
    });
}

function registrarDenom() {
    const moneda = document.getElementById("denom-moneda").value;
    const valor = parseFloat(document.getElementById("denom-valor").value);
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_denom", moneda, valor })
    }).then(res => res.json());
}

function listarDenoms() {
    const moneda = document.getElementById("denom-lista-moneda").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_denoms", moneda })
    }).then(res => res.json()).then(data => {
        const ul = document.getElementById("lista-denoms");
        ul.innerHTML = "";
        data.forEach(v => {
            const li = document.createElement("li");
            li.innerText = `${moneda} ${v}`;
            ul.appendChild(li);
        });
    });
}
function registrarBoveda() {
    const idBoveda = document.getElementById("id-boveda").value;
    const banco = document.getElementById("boveda-banco").value;
    const plaza = document.getElementById("boveda-plaza").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_boveda", banco, plaza,idBoveda })
    })
    .then(res => res.json())
    .then(alert);
}

function listarBovedas() {
    const banco = document.getElementById("boveda-lista-banco").value;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_bovedas", banco })
    })
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("lista-bovedas");
        ul.innerHTML = "";
        data.forEach(p => {
            const li = document.createElement("li");
            li.innerText = `Boveda: ${p}`;
            ul.appendChild(li);
        });
    });
}
function depositarDinero() {
    const data = {
        op: "depositar_dinero",
        idBoveda: document.getElementById("dep-id-boveda").value,
        moneda: document.getElementById("dep-moneda").value,
        valor: parseFloat(document.getElementById("dep-valor").value),
        cantidad: parseInt(document.getElementById("dep-cantidad").value)
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(alert);
}
function agregarCampoValoracion() {
    const container = document.getElementById("valoraciones-container");
    const div = document.createElement("div");
    div.className = "valoracion";
    div.innerHTML = `
        <input type="text" placeholder="Moneda" class="val-moneda">
        <input type="number" placeholder="Valor" class="val-valor">
    `;
    container.appendChild(div);
}
function agregarActivo() {
    const idBoveda = document.getElementById("idBoveda").value;
    const tipo = document.getElementById("act-tipo").value;
    const valoraciones = [];
    const contenedor = document.getElementById("valoraciones-container");
    const campos = contenedor.querySelectorAll(".valoracion");
    campos.forEach(div => {
        const moneda = div.querySelector(".val-moneda").value;
        const valor = parseFloat(div.querySelector(".val-valor").value);
        if (moneda && !isNaN(valor)) {
            valoraciones.push({ moneda, valor });
        }
    });
    const data = {
        op: "agregar_activo",
        idBoveda,
        tipo,
        valoraciones
    };
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(alert);
}


function verEstadoBoveda() {
    const idBoveda = document.getElementById("idBovedaE").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "estado_boveda", idBoveda })
    }).then(async res => {
    if (!res.ok) {
        const text = await res.text(); // lee como texto plano
        throw new Error(text);
    }
    return res.json(); // solo si es válido
})
.then(data => {
    const salida = document.getElementById("estado-boveda-output");
    salida.innerHTML = ""; // Limpia contenido anterior

    // Mostrar dinero
    const dineroHtml = Object.entries(data.dinero).map(([moneda, cantidad]) =>
        `<li><strong>${moneda}:</strong> ${cantidad}</li>`
    ).join("");

    // Mostrar activos
    const activosHtml = Object.entries(data.activos).map(([tipo, monedas]) => {
        const lista = Object.entries(monedas).map(([moneda, valor]) =>
            `<li>${moneda}: ${valor}</li>`
        ).join("");
        return `<li><strong>${tipo}</strong><ul>${lista}</ul></li>`;
    }).join("");

    salida.innerHTML = `
        <h4>💰 Dinero</h4>
        <ul>${dineroHtml}</ul>
        <h4>📦 Activos</h4>
        <ul>${activosHtml}</ul>
    `;
})

.catch(error => {
    document.getElementById("estado-boveda-output").innerText =
        "Error: " + error.message;
});
}

function registrarSaldo() {
    const idBoveda = document.getElementById("idBovedaRS").value;
    const fecha = document.getElementById("saldo-fecha").value;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_saldo", idBoveda, fecha })
    }).then(res => res.json()).then(alert);
}

function verSaldo() {
    const idBoveda = document.getElementById("idBovedaS").value;
    const fecha = document.getElementById("consulta-fecha").value;
    const resultadoDiv = document.getElementById("resultado-saldo");

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "ver_saldo", idBoveda, fecha })
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(texto => { throw new Error(texto); });
        }
        return res.json();
    })
    .then(data => {
        // Limpia el contenido anterior
        resultadoDiv.innerHTML = "";

        // Mostrar dinero
        const dineroHtml = Object.entries(data.dinero).map(([moneda, cantidad]) =>
            `<li><strong>${moneda}:</strong> ${cantidad}</li>`
        ).join("");

        // Mostrar activos
        const activosHtml = Object.entries(data.activos).map(([tipo, valores]) => {
            const lista = Object.entries(valores).map(([nombre, valor]) =>
                `<li>${nombre}: ${valor}</li>`
            ).join("");
            return `<li><strong>${tipo}</strong><ul>${lista}</ul></li>`;
        }).join("");

        resultadoDiv.innerHTML = `
            <h4>💰 Dinero</h4>
            <ul>${dineroHtml}</ul>
            <h4>📦 Activos</h4>
            <ul>${activosHtml}</ul>
        `;
    })
    .catch(err => {
        resultadoDiv.innerHTML = `<span style="color: red;">${err.message}</span>`;
    });
}
async function ejecutarTransaccion(id) {
    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ op: "ejecutar_transaccion", id })
        });

        const text = await res.text(); // Puede ser string o JSON
        if (!res.ok) {
            alert(`❌ Error al ejecutar: ${text}`);
        } else {
            alert(`✅ ${text}`);
        }
    } catch (error) {
        alert(`❌ Error de red o servidor: ${error.message}`);
    }
}

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
        const pre = document.createElement("pre");
        pre.innerText = JSON.stringify(data, null, 2);

        // Opcional: limpiar antes de mostrar
        const prev = document.querySelector("pre");
        if (prev) prev.remove();

        document.body.appendChild(pre);

    } catch (error) {
        alert(`❌ Error al obtener detalle: ${error.message}`);
    }
}
function registrarTransportador() {
    const nombre = document.getElementById("transportador-nombre").value;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            op: "registrar_transportador",
            nombre: nombre
        })
    })
    .then(res => res.json())
    .then(msg => {
        document.getElementById("transportador-respuesta").innerText = msg;
        listarTransportadores(); // Opcional: actualiza lista al registrar
    })
    .catch(err => {
        document.getElementById("transportador-respuesta").innerText = "❌ Error: " + err.message;
    });
}

function listarTransportadores() {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "listar_transportadores" })
    })
    .then(res => res.json())
    .then(data => {
        const lista = document.getElementById("lista-transportadores");
        lista.innerHTML = ""; // Limpiar anterior
        data.forEach(nombre => {
            const li = document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
        });
    })
    .catch(err => {
        console.error("Error al listar transportadores:", err.message);
    });
}
