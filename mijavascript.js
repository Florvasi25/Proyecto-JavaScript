// //1ERA PRUEBA

// const productos = ["Remera", "Zapatillas", "Medias"];
// let primeraPregunta = prompt("Quiere comprar algún producto? Responda si o no.").toUpperCase();

// if(primeraPregunta === "SI"){
//     let segundaPregunta = prompt("Ingrese si quiere 'Remera', 'Zapatillas' o 'Medias'.");
//     const index = productos.indexOf(segundaPregunta)
//     if(index !== -1){
//         alert("Usted a seleccionado: " + segundaPregunta) 
//     }else{
//         alert("Gracias vuelvas prontos.")
//     }
// }

// //2DA PRUEBA

// function Producto(nombreParametro) {
//     this.nombre = nombreParametro
// }

// const producto1 = new Producto("Remera");
// const producto2 = new Producto("Zapatillas");
// const producto3 = new Producto("Medias");

// const carrito = [producto1, producto2, producto3];

// let primeraPregunta = prompt("Quiere comprar algún producto? Responda si o no.").toUpperCase();

// if(primeraPregunta === "SI"){
//     let segundaPregunta = prompt("Ingrese si quiere 'Remera', 'Zapatillas' o 'Medias'.");
//     const listado = carrito.findIndex(producto => producto.nombre === segundaPregunta);
//     if(listado !== -1){
//         alert("Usted a seleccionado: " + segundaPregunta) 
//     }else{
//         alert("Gracias vuelvas prontos.")
//     }
//     console.log(listado)
// }

// //3RA PRUEBA

// function Producto(nombreParametro, precioParametro) {
//     this.nombre = nombreParametro
//     this.precio = precioParametro
// }

// const producto1 = new Producto("Remera", 100);
// const producto2 = new Producto("Zapatillas", 1000);
// const producto3 = new Producto("Medias", 10);

// const carrito = [producto1, producto2, producto3];

// let primeraPregunta = prompt("Quiere comprar algún producto? Responda si o no.").toUpperCase();

// if(primeraPregunta === "SI"){
//     let segundaPregunta = prompt("Ingrese si quiere 'Remera', 'Zapatillas' o 'Medias'.");
//     const listado = carrito.find(producto => producto.nombre.toUpperCase() === segundaPregunta.toUpperCase());
//     if(listado !== undefined){
//         alert("Usted a seleccionado: " + listado.nombre + ". Precio: " + listado.precio) 
//     }else{
//         alert("Gracias vuelvas prontos.")
//     }
// }

// //4TA PRUEBA

// function Producto(nombreParametro, precioParametro) {
//     this.nombre = nombreParametro
//     this.precio = precioParametro
// }

// const producto1 = new Producto("Remera", 100);
// const producto2 = new Producto("Zapatillas", 1000);
// const producto3 = new Producto("Medias", 10);

// const carrito = [producto1, producto2, producto3];

// let precioFinal = 0;

// while (true) {
//     let primeraPregunta = prompt("Quiere comprar algún producto? Responda si o no.").toUpperCase();

//     if(primeraPregunta === "SI"){
//         let segundaPregunta = prompt("Ingrese si quiere 'Remera', 'Zapatillas' o 'Medias'.");
//         const listado = carrito.find(producto => producto.nombre.toUpperCase() === segundaPregunta.toUpperCase());
//         if(listado !== undefined){
//             preguntarCantidad = parseInt(prompt("Ingrese la cantidad. Precio por unidad: " + listado.precio))
//             if(isNaN(preguntarCantidad)){
//                 alert("Ingrese una cantidad válida");
//             }else{
//                 precioFinal += preguntarCantidad * listado.precio
//                 alert("Su subtotal es de: " + precioFinal);
//                 console.log(preguntarCantidad)
//             } 
//         }else{
//             alert("No tenemos el producto mencionado");
//             continue;
//         }
//     }else{
//         alert("Gracias vuelvas prontos. Su total es de :" + precioFinal);
//         break;
//     }
// }

//5TA PRUEBA

function Producto(nombreParametro, precioParametro, stockParametro) {
    this.nombre = nombreParametro;
    this.precio = precioParametro;
    this.stock = stockParametro;
}

const producto1 = new Producto("Remera", 100, 10);
const producto2 = new Producto("Zapatillas", 1000, 10);
const producto3 = new Producto("Medias", 10, 10);

const catalogo = [producto1, producto2, producto3];

let precioFinal = 0;

function validarStock (productoObjeto, cantidad){
    productoObjeto.stock -= cantidad;
}

while (true) {
    let primeraPregunta = prompt("Quiere comprar algún producto? Responda si o no.").toUpperCase();

    if(primeraPregunta === "SI"){
        while (true) {
            let segundaPregunta = prompt("Ingrese si quiere 'Remera', 'Zapatillas' o 'Medias'.");
            const producto = catalogo.find(producto => producto.nombre.toUpperCase() === segundaPregunta.toUpperCase());
            if(producto !== undefined){
                while (true) {
                    preguntarCantidad = parseInt(prompt("Ingrese la cantidad. Precio por unidad: " + producto.precio + ". Cantidad en stock: " + producto.stock))
                    if(isNaN(preguntarCantidad) || (preguntarCantidad <= 0)){
                        alert("Ingrese una cantidad válida");
                        continue;
                    }else{
                        if (preguntarCantidad <= producto.stock){
                            validarStock(producto, preguntarCantidad);
                            precioFinal += preguntarCantidad * producto.precio;
                            alert("Usted a agregado al catalogo: " + preguntarCantidad + " x " + producto.nombre + ". Su subtotal es de: " + precioFinal);
                        }else{
                            alert("No contamos con esa cantidad de stock");
                            continue;
                        }
                    }
                    break; 
                }
            }else{
                alert("No tenemos el producto mencionado");
                continue;
            }
            break;
        }
    }else{
        alert("Gracias vuelvas prontos. Su total es de: " + precioFinal);
        break;
    }
}