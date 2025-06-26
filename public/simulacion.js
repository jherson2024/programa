async function simularSistemaBancario() {
    const apiUrl = "http://localhost:5000";
    const monedas = ["dolar", "libra", "yen", "sol", "euro"];
    const tiposActivo = ["bonos", "joyas", "obras de arte", "criptomonedas", "terrenos"];
    const bancos = ["BCP", "INTERBANK", "SCOTIABANK", "BBVA"];
    const plazas = ["Lima", "Arequipa", "Cusco", "Trujillo"];
    const transportadores = ["FlashCargo", "TransExpress", "SafeMove", "MoneyRun", "FortiTrans"];
    const tiposOperacion = [
    "traslado",           // Movimiento entre dos bóvedas dentro del sistema
    "ingreso",            // Entrada al sistema (nuevo activo o dinero depositado)
    "retiro",             // Salida del sistema (activo/dinero retirado o eliminado)
    "custodia",           // Movimiento para resguardo temporal (con devolución esperada)
    "reubicación",        // Cambio de ubicación dentro de la misma entidad (ej. banco)
    "transferencia",      // Movimiento con cambio de propietario/responsabilidad
    "devolución",         // Regreso de un elemento previamente custodiado o prestado
    "incautación",        // Movimiento forzoso por orden legal
    "auditoría",          // Movimiento ficticio o temporal para fines de control/verificación
    ];

// Registrar transportadores
for (const nombre of transportadores) {
    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "registrar_transportador", nombre })
    });
}
    // Registrar monedas
    for (const nombre of monedas) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ op: "registrar_moneda", nombre })
        });
    }

    // Registrar denominaciones por moneda
    for (const moneda of monedas) {
        for (const valor of [10, 20, 50, 100, 200]) {
            await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ op: "registrar_denom", moneda, valor })
            });
        }
    }

    // Registrar tipos de activos
    for (const nombre of tiposActivo) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ op: "registrar_tipo_activo", nombre })
        });
    }
    // Registrar tipos de operacion
    for (const nombre of tiposOperacion) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ op: "registrar_tipo_operacion", nombre })
        });
    }
    // Registrar bancos y plazas
    for (const nombre of bancos) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ op: "registrar_banco", nombre })
        });
    }
    for (const nombre of plazas) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ op: "registrar_plaza", nombre })
        });
    }
    // Registrar bóvedas y activos
    let bovedaId = 1;
    for (const banco of bancos) {
        for (const plaza of plazas) {
            const numBovedas = 1 + Math.floor(Math.random() * 1); // 1 a 2 bóvedas
            for (let i = 0; i < numBovedas; i++) {
                const idBoveda = `${bovedaId++}`;
                await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ op: "registrar_boveda", banco, plaza, idBoveda })
                });

                // Agregar 2 a 4 activos por bóveda
                const activosEnBoveda = tiposActivo.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 3));
                for (const tipo of activosEnBoveda) {
                   // Solo valoraciones en soles o dólares, no ambos
                    const moneda = Math.random() < 0.5 ? "sol" : "dolar";
                    const tasaCambio = 3.7; // por ejemplo, 1 dólar = 3.7 soles
                    let valor = Math.floor(Math.random() * 9000) + 1000;

                    if (moneda === "dolar") {
                        valor = Math.floor(valor / tasaCambio);
                    }

                    const valoraciones = [{
                        moneda,
                        valor
                    }];

                    await fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            op: "agregar_activo",
                            idBoveda,
                            tipo,
                            valoraciones
                        })
                    });
                }
                // Depositar algo de dinero en varias monedas
                for (const moneda of monedas) {
                    const cantidad = Math.floor(Math.random() * 50);
                    const valor = [10, 20, 50, 100, 200][Math.floor(Math.random() * 5)];
                    await fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            op: "depositar_dinero",
                            idBoveda,
                            moneda,
                            valor,
                            cantidad
                        })
                    });
                }
            }
        }
    }
    console.log("✅ Simulación de sistema bancario completada.");
}
