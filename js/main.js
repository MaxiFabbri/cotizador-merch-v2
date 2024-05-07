const hoy = new Date();
const fechaCorta = fecha => fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear();
let cambioDolar = {
    cambio: parseFloat(868.5),
    fecha: "1-1-2024"
}
const cotizaciones = []

// Array de prueba con Clientes
const clientes = [
    {
        idCli: 1,
        nombreCli: "Coca-Cola",
        cuitCli: "30-11222333-1"
    },
    {
        idCli: 2,
        nombreCli: "Pepsi",
        cuitCli: "30-22333444-2"
    },
    {
        idCli: 3,
        nombreCli: "Quilmes",
        cuitCli: "30-33444555-3"
    },
    {
        idCli: 4,
        nombreCli: "Imperial",
        cuitCli: "30-44555666-4"
    }
]
// Array de prueba con proveedores
const proveedores = [
    {
        idPro: 1,
        nombrePro: "Zecat",
        cuitPro: "27-11555666-5"
    },
    {
        idPro: 2,
        nombrePro: "Importadora XYZ",
        cuitPro: "27-22666777-6"
    },
    {
        idPro: 3,
        nombrePro: "Grabados ZZZ",
        cuitPro: "27-33777888-7"
    },
    {
        idPro: 4,
        nombrePro: "Bordados FFF",
        cuitPro: "27-44888999-8"
    }
]
// Actualizo el TC si lo tengo guardado en la LS
let tipoCambioLS = localStorage.getItem('tipoCambio');
if(tipoCambioLS) {
    cambioDolar = JSON.parse(tipoCambioLS)
}
// Actualizo el Tipo de cambio con una API
obtenerDolar();

async function obtenerDolar () {
    let URL = "https://dolarapi.com/v1/dolares/oficial"
    try {
        let solicitud = await fetch(URL);
        let response = await solicitud.json();
        cambioDolar.cambio = response.venta;
        cambioDolar.fecha = fechaCorta(hoy);
        const cambioEnJson = JSON.stringify(cambioDolar);
        localStorage.setItem('tipoCambio',cambioEnJson);
    } catch (err) {
        console.log("Error detectado, no se pudo recuperar el TC de la API: ", err);
    } 
  }

// Creo la Clase Cotizaciones para cargar los encabezados de las cotizaciones
class Cotizacion {
    static id = 0
    constructor (fecha, dolar, cliente, cantidad, descripcion) {
        this.id = ++Cotizacion.id
        this.fecha = fecha,
        this.dolar = dolar,
        this.cliente = cliente,
        this.cantidad = cantidad,
        this.descripcion = descripcion
    }
    updateDolar(nuevoDolar) {
        this.dolar = nuevoDolar;
    }
    updateCliente(nuevoCliente) {
        this.cliente = nuevoCliente;
    }
    updateCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad;
    }
    updateDescripcion(nuevaDescripcion ) {
        this.descripcion = nuevaDescripcion;
    }
}