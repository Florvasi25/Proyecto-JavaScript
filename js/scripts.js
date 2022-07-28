//1RA PRUEBA MODIFICANDO DOM MEDIANTE PROMPT

// let primerPregunta = prompt("Quiere cambiar el nombre del local?").toUpperCase();

// if (primerPregunta === "SI") {
//     let textoPrompt = prompt("Ingrese el nuevo nombre del local")
//     let nuevoTexto = (document.querySelector(".display-4").textContent = textoPrompt);
// } else {
//     alert("Gracias, vuelvas prontos");
// }

//2DA PRUEBA AGREGANDO ARRAY DE PRODUCTOS

// let productos = [
//         {id: 1, nombre: "Diseño", precio: "1200"},
//         {id: 2, nombre: "Data", precio: "1200"},
//         {id: 3, nombre: "Producto", precio: "1200"},
//         {id: 4, nombre: "JS", precio: "1200"}
//     ]

// for (let producto of productos) {
//     let contenedor = document.createElement("div");
//     contenedor.innerHTML = `<h3>${producto.nombre}</h3>
//     <p>${producto.precio}</p>`;

//     document.body.appendChild(contenedor);
// }hola

//3ER PRUEBA AGREGANDO ARRAY DE PRODUCTOS

function Producto(nombreParametro, precioParametro, stockParametro) {
    this.nombre = nombreParametro;
    this.precio = precioParametro;
    this.stock = stockParametro;
}

const producto1 = new Producto("Remera", 100, 10);
const producto2 = new Producto("Zapatillas", 1000, 10);
const producto3 = new Producto("Medias", 10, 10);

const catalogo = [producto1, producto2, producto3];

for (let prod of catalogo) {
let contenedor = document.createElement("div");
contenedor.innerHTML = `<h3>${prod.nombre}</h3>
<p>${prod.precio}</p>`;

document.body.appendChild(contenedor);

const principioBody = document.querySelector(".hola")
console.log(principioBody.children)

principioBody.insertBefore(contenedor, principioBody.children[0])
}

