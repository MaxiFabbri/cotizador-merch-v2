// Defino los elementos del DOM
const muestroDolar = document.getElementById('tipoCambio');
const inputCliente = document.getElementById('inCliente');
const datalistSugerenciasCli = document.getElementById('sugerenciasCliente');
const inputDescripcion = document.getElementById('inDescripcion');
const inputCantidad = document.getElementById('inCantidad');


// cargo una cotización vacía
cargarCotizaciones = () => {
  const cotizacion = new Cotizacion(hoy, cambioDolar.cambio, "", 0,"" );
  cotizaciones.push(cotizacion);
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

// Llenar las listas de sugerencias con valores iniciales en Clientes
clientes.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.nombreCli;
    datalistSugerenciasCli.appendChild(option);
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

// controlo modificación de datos y los valido antes de modificarlos en el array en el encabezado
inputCantidad.onchange = () => {
  if (inputCantidad.value > 0) {
    inputCantidad.classList.remove("is-invalid");
    inputCantidad.classList.add("is-valid");
    cotizaciones[cotizaciones.length -1].updateCantidad(inputCantidad.value);
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
  } else {
    console.log("Este Campo es obligatorio")
    inputDescripcion.classList.remove("is-valid");
    inputDescripcion.classList.add("is-invalid");
  }
}
