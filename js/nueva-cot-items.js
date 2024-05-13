var numeroFilaItem = 2;
const datalistSugerenciasProv = document.getElementById('sugerenciasProveedor');
const sumarItem = document.getElementById('sumarItem');
const tablaItems = document.getElementById('tablaItems');
const inputProvs = document.querySelectorAll('.input-proveedor');
const botonEliminarItem = document.querySelectorAll('.eliminar-item')

// cargo un Item Vacío
cargarItem = () => {
  const item = new Item(cotizaciones.length, 0, 0, "", "");
  items.push(item);
  console.log(items)
}
cargarItem();

// Agrego una fila con Items, cuando aprietan el Boton Sumar Intem 
sumarItem.onclick = () => {
    agregarItem();
    cargarItem();
}

// ***Llenar las listas de sugerencias con valores iniciales en Proveedores No funciona en varial filas ***
inputProvs.forEach(inputProv => {
  const datalistSugerenciasProv = document.createElement('datalist');
  datalistSugerenciasProv.id = `datalistSugerenciasProv-${inputProv.id}`; // Unique ID for each datalist
  inputProv.parentNode.appendChild(datalistSugerenciasProv); // Add datalist to the same parent as the input

  proveedores.forEach(proveedor => {
    const option = document.createElement('option');
    option.value = proveedor.nombrePro;
    datalistSugerenciasProv.appendChild(option);
  });

  inputProv.addEventListener('input', function(event) {
    const valorInput = this.value.toLowerCase();
    datalistSugerenciasProv.innerHTML = ''; // Clear previous suggestions
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

  // Set the list attribute of the input to the corresponding datalist ID
  inputProv.setAttribute('list', datalistSugerenciasProv.id); 
});


// Borro un item cuando tocan el boton Borrar
tablaItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminar-item')) {
    const fila = event.target.parentNode.parentNode;
    const indiceFila = parseInt(fila.dataset.fila, 10);
    const idABorrar = items.findIndex(el => el.id === indiceFila)
    items.splice(idABorrar, 1);
    fila.remove();
  }
});

// Modifico los datos del array, cuando se modifican en pantalla
tablaItems.addEventListener('change', (event) => {
  if (event.target.classList.contains('item-grilla')) {
    const inputCambiado = event.target;
    if ( inputCambiado.id.startsWith('proveedorItem')) {
      inputCambiado.id = 'proveedorItem'
    }
    const indiceFila = parseInt(inputCambiado.parentNode.parentNode.dataset.fila, 10);
    modificaItem(indiceFila, event.target.id, inputCambiado.value )
  }
});

// Funcion que Valida y modifica datos en el array
function modificaItem(idFila, idModificado, nuevoValor) {
  const fila = items.findIndex(item => item.id === idFila);
  if (fila >= 0) {    
    items[fila][idModificado] = validaValorItem(idFila, idModificado, nuevoValor);
  } else {
    console.log('ERROR ID no encontrado')
  }
}

// Funcion que agrega Items en pantalla
function agregarItem() {
  let fila = document.createElement("tr")
  fila.dataset.fila = numeroFilaItem;
  fila.classList.add("entrada-datos-item");
  fila.innerHTML = `<td>
                      <input class="item-grilla" type="number" name="costo-unitario" value="0" id="costoUnitarioItem">
                    </td>
                    <td>
                      <input class="item-grilla" type="number" name="costo-fijo" value="0" id="costoFijoItem">
                    </td>
                    <td>
                      <input class="item-grilla input-proveedor" type="text" name="Proveedor" value="" id="proveedorItem-${numeroFilaItem}"> 
                    </td>
                    <td>
                      <input class="item-grilla" type="text" name="Descripcion" value="Descripción" id="descripcionItem">
                    </td>  
                    <td>
                      <button class="eliminar-item" id="eliminarItem">Eliminar</button>
                    </td>`;
  tablaItems.appendChild(fila);

  // After appending the row, find the new input-proveedor and create its datalist
  const newInputProv = fila.querySelector('.input-proveedor');
  const datalistSugerenciasProv = document.createElement('datalist');
  datalistSugerenciasProv.id = `datalistSugerenciasProv-${newInputProv.id}`;
  newInputProv.parentNode.appendChild(datalistSugerenciasProv);

  proveedores.forEach(proveedor => {
    const option = document.createElement('option');
    option.value = proveedor.nombrePro;
    datalistSugerenciasProv.appendChild(option);
  });

  newInputProv.setAttribute('list', datalistSugerenciasProv.id);

  numeroFilaItem++;
}

// Funcion que valida los valores del Item
function validaValorItem (numeroFila, idModif, valor) {
  const filaId = document.querySelector(`[data-fila="${numeroFila}"]`)
  const itemId = filaId.querySelector(`#${idModif}`);
  // Valido si es costoUnitarioItem
  if (idModif === 'costoUnitarioItem') {
    if (valor > 0 ) {
      itemId.classList.remove("is-invalid");
      itemId.classList.add("is-valid")
      return parseInt(valor);
    } else {
      itemId.classList.remove("is-valid");
      itemId.classList.add("is-invalid")
      return 0;
    }
  } 
  // Valido si es costoFijoItem
  else if (idModif === 'costoFijoItem') {
    if (valor >= 0 ) {
      itemId.classList.remove("is-invalid");
      itemId.classList.add("is-valid")
      return parseInt(valor);
    } else {
      itemId.classList.remove("is-valid");
      itemId.classList.add("is-invalid")
      return 0;
    } 
  } 
  // valido si es proveedorItem o detalleItem
  else if (idModif.startsWith('proveedorItem') || idModif === 'descripcionItem') {
    console.log(valor)
    if (valor != '' ) {
      itemId.classList.remove("is-invalid");
      itemId.classList.add("is-valid")
      return valor;
    } else {
      itemId.classList.remove("is-valid");
      itemId.classList.add("is-invalid")
      return "";
    } 
  } 
  // Opcion por si no es ninguno de los anteriores
  else {
    console.log('Error')
  }
}

