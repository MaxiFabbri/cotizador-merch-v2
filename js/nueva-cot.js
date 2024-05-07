var numeroFilaItem = 0;
var numeroFilaOtros = 0;
// Defino los elementos del DOM
const muestroDolar = document.getElementById('tipoCambio');
const inputCliente = document.getElementById('inCliente');
const datalistSugerenciasCli = document.getElementById('sugerenciasCliente');
const inputDescripcion = document.getElementById('inDescripcion');
const inputProv = document.getElementById('inProveedor');
const datalistSugerenciasProv = document.getElementById('sugerenciasProveedor');
const inputCantidad = document.getElementById('inCantidad');
const sumarItem = document.getElementById('sumarItem');
const tablaItems = document.getElementById('tablaItems');
const sumarOtroCosto = document.getElementById('sumarOtroCosto');
const tablaOtrosCostos = document.getElementById('tablaOtrosCostos');

// cargo una cotización vacía
cargarCotizaciones = () => {
  const cotizacion = new Cotizacion(hoy, cambioDolar.cambio, "", 0,"" )
  cotizaciones.push(cotizacion)
}
cargarCotizaciones ()


// Muestro el valor del Dolar Vigente y la Fecha, y permito que lo modifiquen para la cotización
muestroDolar.value = cambioDolar.cambio.toFixed(2);
muestroDolar.onchange = () => {
  if (muestroDolar.value > 0) {
    muestroDolar.classList.remove("is-invalid");
    muestroDolar.classList.add("is-valid");
    cambioDolar.cambio = muestroDolar.value;
    cotizaciones[cotizaciones.length -1].updateDolar(cambioDolar.cambio);
  } else {
    console.log("Importe no valido")
    muestroDolar.classList.remove("is-valid");
    muestroDolar.classList.add("is-invalid");
  }   
}
document.getElementById("fechaCambio").innerText = cambioDolar.fecha;

// Agrego una fila con Items, cuando aprietan el Boton Sumar Intem  ++y los Borro cuando apretan eliminar++ ESTO FALTA
sumarItem.onclick = () => {
    agregarItem();
}
sumarOtroCosto.onclick = () => {
    agregarOtros();
}


// Llenar las listas de sugerencias con valores iniciales
clientes.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.nombreCli;
    datalistSugerenciasCli.appendChild(option);
});
proveedores.forEach(proveedor => {
    const option = document.createElement('option');
    option.value = proveedor.nombrePro;
    datalistSugerenciasProv.appendChild(option);
});
inputCliente.addEventListener('input', function() {
    const valorInput = this.value.toLowerCase();    
    // Limpiar la lista de sugerencias
    datalistSugerenciasCli.innerHTML = '';
    // Filtrar y mostrar las sugerencias
    clientes.forEach(cliente => {
        if (cliente.nombreCli.toLowerCase().startsWith(valorInput)) {
            const option = document.createElement('option');
            option.value = cliente.nombreCli;
            datalistSugerenciasCli.appendChild(option);
        }
    });
    if (clientes.some(cli => cli.nombreCli.toLowerCase() === valorInput )) {
        inputCliente.classList.remove("is-invalid");
        inputCliente.classList.add("is-valid");
        cotizaciones[cotizaciones.length -1].updateCliente(valorInput);
        console.log(cotizaciones);
      } else {
        inputCliente.classList.remove("is-valid");
        inputCliente.classList.add("is-invalid");
      }
});
inputProv.addEventListener('input', function() {
    const valorInput = this.value.toLowerCase();
    datalistSugerenciasProv.innerHTML = '';
    proveedores.forEach(proveedor => {
        if (proveedor.nombrePro.toLowerCase().startsWith(valorInput)) {
            const option = document.createElement('option');
            option.value = proveedor.nombrePro;
            datalistSugerenciasProv.appendChild(option);
        }
    });
    if (proveedores.some(prov => prov.nombrePro.toLowerCase() === valorInput )) {
      inputProv.classList.remove("is-invalid");
      inputProv.classList.add("is-valid");

    } else {
      inputProv.classList.remove("is-valid");
      inputProv.classList.add("is-invalid");
    }
});


function agregarItem() {
    let fila = document.createElement("tr")
    fila.classList.add("entrada-datos-item");
    numeroFilaItem++;
    fila.innerHTML = `<td>
                        <input class="item-grilla" type="number" name="costo-unitario" value="0" id="inCostoUnitario">
                      </td>
                      <td>
                        <input class="item-grilla" type="number" name="costo-fijo" value="0" id="inCostoFijo">
                      </td>
                      <td>
                        <input class="item-grilla" type="text" name="Proveedor" value="" id="inProveedor" list="sugerenciasProveedor">
                        <datalist id="sugerenciasProveedor"></datalist>  
                      </td>
                      <td>
                        <input class="item-grilla" type="text" name="Detalle" value="Detalle" id="inDetalle">
                      </td>  
                      <td>
                        <button class="eliminar-item" id="eliminarItem">Eliminar</button>
                      </td>`;
    tablaItems.appendChild(fila)
}
// function eliminarItem () {
//   let removebutton = document.querySelectorAll(".eliminar-item")
//     removebutton.forEach (button => {
//         button.onclick = (e) => {
//             const itemId = e.currentTarget.id
//             console.log(itemId)

            
//         }
//     })
// }
// eliminarItem ();

function agregarOtros() {
    let fila = document.createElement("tr")
    fila.classList.add("entrada-datos-item");
    numeroFilaOtros++;
    fila.innerHTML = `<td>
                        <label for="inProducto">Detalle:</label>
                      </td>
                      <td>
                        <input class="item-grilla" type="text" name="Detalle" value="Detalle" id="inDetalle${numeroFilaOtros}">  
                      </td>
                      <td>
                        <label for="inOtrosCostos">Otros Costos:</label> 
                      </td>
                      <td>
                        <input class="item-grilla" type="number" name="otros-costos" value="0" id="inOtrosCostos${numeroFilaOtros}">
                      </td>
                      <td>
                        <button id="eliminarOtro${numeroFilaOtros}">Eliminar</button>
                      </td>`;
    tablaOtrosCostos.appendChild(fila)
}

// controlo modificación de datos y los valido antes de modificarlos en el array
inputCantidad.onchange = () => {
  if (inputCantidad.value > 0) {
    inputCantidad.classList.remove("is-invalid");
    inputCantidad.classList.add("is-valid");
    cotizaciones[cotizaciones.length -1].updateCantidad(inputCantidad.value);
    console.log(cotizaciones);
  } else {
    console.log("Importe no valido")
    inputCantidad.classList.remove("is-valid");
    inputCantidad.classList.add("is-invalid");
  }
}
inputDescripcion.onchange = () => {
  if (inputDescripcion.value != "" ) {
    inputDescripcion.classList.remove("is-invalid");
    inputDescripcion.classList.add("is-valid");
    cotizaciones[cotizaciones.length -1].updateDescripcion(inputDescripcion.value);
    console.log(cotizaciones);
  } else {
    console.log("Importe no valido")
    inputDescripcion.classList.remove("is-valid");
    inputDescripcion.classList.add("is-invalid");
  }
}
