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