let transDinero = [];
let transActivos = [];

function agregarDineroTrans() {
  const moneda = document.getElementById("trans-moneda").value.trim();
  const valor = parseFloat(document.getElementById("trans-valor").value);
  const cantidad = parseInt(document.getElementById("trans-cantidad").value);

  if (!moneda || isNaN(valor) || isNaN(cantidad)) return;

  transDinero.push({ moneda, valor, cantidad });

  const li = document.createElement("li");
  li.textContent = `${cantidad} x ${valor} ${moneda}`;
  document.getElementById("trans-dinero-lista").appendChild(li);
}

function agregarActivoTrans() {
  const tipo = document.getElementById("trans-tipo-activo").value.trim();
  const moneda = document.getElementById("trans-activo-moneda").value.trim();
  const cantidad = parseFloat(document.getElementById("trans-activo-cantidad").value);

  if (!tipo || !moneda || isNaN(cantidad)) return;

  transActivos.push({ tipo, moneda, cantidad });

  const li = document.createElement("li");
  li.textContent = `${tipo} → ${cantidad} ${moneda}`;
  document.getElementById("trans-activos-lista").appendChild(li);
}

async function registrarTransaccion() {
  const body = {
    op: "registrar_transaccion",
    transportador: document.getElementById("trans-transportador").value.trim(),
    tipoOperacion: document.getElementById("trans-operacion").value.trim(),
    fechaInicio: document.getElementById("trans-fecha-inicio").value.trim(),
    fechaFin: document.getElementById("trans-fecha-fin").value.trim(),
    idBovedaInicio: document.getElementById("trans-boveda-inicio").value.trim(),
    idBovedaFin: document.getElementById("trans-boveda-fin").value.trim(),
    dinero: transDinero,
    activos: transActivos
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const text = await res.text();
    document.getElementById("trans-respuesta").textContent = res.ok
      ? `✅ ${text}`
      : `❌ ${text}`;

    if (res.ok) {
      transDinero = [];
      transActivos = [];
      document.getElementById("trans-dinero-lista").innerHTML = "";
      document.getElementById("trans-activos-lista").innerHTML = "";
    }
  } catch (err) {
    document.getElementById("trans-respuesta").textContent =
      "❌ Error de red o servidor: " + err.message;
  }
}
