var numeroFilaOtros = 0;
const sumarOtroCosto = document.getElementById('sumarOtroCosto');
const tablaOtrosCostos = document.getElementById('tablaOtrosCostos');

sumarOtroCosto.onclick = () => {
  agregarOtros();
}

// Borro Otro Costo
tablaOtrosCostos.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminar-item')) {
    const fila = event.target.parentNode.parentNode;
    fila.remove();
  }
});

// Funcion Agregar otro costo en pantalla
function agregarOtros() {
    let fila = document.createElement("tr")
    fila.classList.add("entrada-datos-item");
    numeroFilaOtros++;
    fila.innerHTML = `<td>
                        <label for="inProducto">Detalle:</label>
                      </td>
                      <td>
                        <input class="item-grilla" type="text" name="Detalle" value="Detalle" id="inDetalle">  
                      </td>
                      <td>
                        <label for="inOtrosCostos">Otros Costos:</label> 
                      </td>
                      <td>
                        <input class="item-grilla" type="number" name="otros-costos" value="0" id="inOtrosCostos">
                      </td>
                      <td>
                        <button class="eliminar-item" id="eliminarOtro">Eliminar</button>
                      </td>`;
    tablaOtrosCostos.appendChild(fila)
}
