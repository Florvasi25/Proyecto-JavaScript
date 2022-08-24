// const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
// document.getElementById("cart-total").innerHTML = calcularTotalCarrito();

// const getProducts = async () => {
//     const response = await fetch("./productos.json");
//     const data = await response.json();
//     return data;
// };

// (async () => {
//     const productos = await getProducts();
//     productos.forEach((producto) => {
//         imprimirCards(producto)  
//     })
//     productos.forEach((producto) => {
//         const idButton = `add-cart${producto.id}`
//         document.getElementById(idButton).onclick = () => {
//             let indexProductoAgregado = carrito.findIndex((p) => p.id === producto.id);
//             if (indexProductoAgregado !== -1){
//                 carrito[indexProductoAgregado].qty += 1
//             }
//             else {
//                 producto.qty = 1
//                 carrito.push(producto); 
//             }
//             // swal({
//             //     title: "Excelente!",
//             //     text: `Agregaste ${producto.name} a tu pedido`,
//             //     icon: "success",
//             //     button: "OK",
//             //   });   
//             document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
//             localStorage.setItem("carrito", JSON.stringify(carrito))
//             mostrarCarrito()
//         }
//     })
//     for (const nodoHTML of document.getElementsByClassName("filtrar-categoria")) {
//         nodoHTML.onclick = (event) => {
//             const categoria = event.target.getAttribute("data-categoria")
//             filtrarProductosPorCategoria(categoria)
//         }
//     }
//     function filtrarProductosPorCategoria(categoria) {
//         document.getElementById("seccion-card").innerHTML = "";
//         const productosFiltrados = productos.filter((producto) => producto.category === categoria);
    
//         productosFiltrados.forEach((producto) => {
//             imprimirCards(producto)
//         })
//     }
// })();

// function calcularTotalCarrito(){
//     let totalProductos = 0;
//     carrito.forEach((producto) => {
//         totalProductos += producto.qty
//     })
//     return totalProductos
// }

// function imprimirCards(producto) {
//     const idButton = `add-cart${producto.id}`
//     document.getElementById("seccion-card").innerHTML += `<div class="col mb-5" type="button" id="cartBody">
//         <div class="card">
//             <img class="card-img-top" src="${producto.image}"/>
//             <div class="card-body p-4">
//                 <div class="text-center">
//                     <h4 class="fw-bolder">${producto.name}</h4>
//                     <p class="description fs-">${producto?.description || ""}</p>
//                     <span class="text-muted">$${producto.price}</span>
//                 </div>
//             </div>
//             <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
//                 <div class="text-center">
//                     <button class="btn btn-outline-dark mt-auto" id=${idButton}>Añadir al carrito</button>
//                 </div>
//             </div>
//         </div>
//     </div>`
// }

// function mostrarCarrito() {
//     let filasCarrito = "";
//     carrito.forEach((producto) => {
//         filasCarrito += `<tr>
//         <td>${producto.name}</td>
//         <td><img src="${producto.image}" style="width: 100px"></td>
//         <td class="cantidad"><button class="remove-one" id=${producto.id}>-</button> ${producto.qty} <button class="add-one" id=${producto.id}>+</button></td>
//         <td>$${producto.price * producto.qty}</td>
//         <td><button class="remove" id=${producto.id}>Quitar Producto</button></td>
//         </tr>`;
//     })
//     document.getElementById("productos-agregados").innerHTML = filasCarrito;
//     precioTotal()
// }

// function precioTotal() {
//     let precioTotal = 0;
//     carrito.forEach((producto) => {
//         precioTotal += producto.price * producto.qty
//     })
//     document.getElementById("precioTotal").innerHTML = `<div>
//     <p>TOTAL: $${precioTotal}</p>
//     </div>`;
// }

// document.getElementById("productos-agregados").onclick = (e) => {
//     let productoEliminado = carrito.findIndex((p) => p.id == e.target.id);
//     if (e.target.className === "remove") {
//         carrito.splice(productoEliminado, 1)
//     } else if (e.target.className === "remove-one") {
//         let newQty = carrito[productoEliminado].qty - 1
//         if (newQty > 0) {
//             carrito[productoEliminado].qty = newQty
//         } else {
//             carrito.splice(productoEliminado, 1)
//         }
//     } else if (e.target.className === "add-one") {
//         carrito[productoEliminado].qty++
//     } 
//     mostrarCarrito()
//     document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
//     localStorage.setItem("carrito", JSON.stringify(carrito))
// }

// mostrarCarrito()

// document.getElementById("myDropdown").addEventListener("click", function(e) {
//     e.stopPropagation();
// });

// document.querySelector('body').onclick = (e) => {
//     console.log('---------------------------------')
//     console.log(e.target)
// }

// Toastify({
//     text: "Envío gratis con tu compra mayor a $1500",
//     duration: 5000,
//     destination: "https://github.com/apvarun/toastify-js",
//     newWindow: true,
//     close: true,
//     offset: {
//         x: 10,
//         y: 800,
//     },    stopOnFocus: true,
//     style: {
//       background: "#696969",
//     },
//     onClick: function(){}
//   }).showToast();

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("cart-total").innerHTML = calcularTotalCarrito();

const getProducts = async () => {
    const response = await fetch("./productos.json");
    const data = await response.json();
    return data;
};

(async () => {
    const productos = await getProducts();
    productos.forEach((producto) => {
        imprimirCards(producto)  
    })
    productos.forEach((producto) => {
        const idButton = `add-cart${producto.id}`
        document.getElementById(idButton).onclick = () => {
            let indexProductoAgregado = carrito.findIndex((p) => p.id === producto.id);
            if (indexProductoAgregado !== -1){
                carrito[indexProductoAgregado].qty += 1
            }
            else {
                producto.qty = 1
                carrito.push(producto); 
            }
            // swal({
            //     title: "Excelente!",
            //     text: `Agregaste ${producto.name} a tu pedido`,
            //     icon: "success",
            //     button: "OK",
            //   });   
            document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito))
            mostrarCarrito()
        }
    })
    // for (const nodoHTML of document.getElementsByClassName("filtrar-categoria")) {
    //     nodoHTML.onclick = (event) => {
    //         const categoriaFiltrada = event.target.getAttribute("data-categoria")
    //         filtrarProductosPorCategoria(categoriaFiltrada)
    //     }
    // }
    // function filtrarProductosPorCategoria(categoriaFiltrada) {
    //     document.getElementById("seccion-card").innerHTML = "";
    //     const productosFiltrados = productos.filter((producto) => producto.category === categoriaFiltrada);
    
    //     productosFiltrados.forEach((producto) => {
    //         imprimirCards(producto)
    //     })
    // }


    const categoriasFiltradas = [...new Set(productos.map(producto => producto.category))]
    categoriasFiltradas.forEach((categoria) => {
        document.getElementById("categoria").innerHTML += `<li class="nav-link filtrar-categoria" data-categoria="categoria">${categoria}</li>`
    }) 
})();

function calcularTotalCarrito(){
    let totalProductos = 0;
    carrito.forEach((producto) => {
        totalProductos += producto.qty
    })
    return totalProductos
}

// function imprimirCards(producto) {
//     const idButton = `add-cart${producto.id}`
//     document.getElementById("seccion-card").innerHTML += `<div class="col mb-5" type="button" id="cartBody">
//         <div class="card">
//             <img class="card-img-top" src="${producto.image}"/>
//             <div class="card-body p-4">
//                 <div class="text-center">
//                     <h4 class="fw-bolder">${producto.name}</h4>
//                     <p class="description fs-">${producto?.description || ""}</p>
//                     <span class="text-muted">$${producto.price}</span>
//                 </div>
//             </div>
//             <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
//                 <div class="text-center">
//                     <button class="btn btn-outline-dark mt-auto" id=${idButton}>Añadir al carrito</button>
//                 </div>
//             </div>
//         </div>
//     </div>`
// }


function imprimirCards(producto) {
    const idButton = `add-cart${producto.id}`
    
    document.getElementById("seccion-card").innerHTML += `<div class="col mb-5" type="button" id="cartBody">
        <div class="card">
            <img class="card-img-top" src="${producto.image}"/>
            <div class="card-body p-4">
                <div class="text-center">
                    <h4 class="fw-bolder">${producto.name}</h4>
                    <p class="description fs-">${producto?.description || ""}</p>
                    <span class="text-muted">$${producto.price}</span>
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <button class="btn btn-outline-dark mt-auto" id=${idButton}>Añadir al carrito</button>
                </div>
            </div>
        </div>
    </div>`
}

function mostrarCarrito() {
    let filasCarrito = "";
    carrito.forEach((producto) => {
        filasCarrito += `<tr>
        <td>${producto.name}</td>
        <td><img src="${producto.image}" style="width: 100px"></td>
        <td class="cantidad"><button class="remove-one" id=${producto.id}>-</button> ${producto.qty} <button class="add-one" id=${producto.id}>+</button></td>
        <td>$${producto.price * producto.qty}</td>
        <td><button class="remove" id=${producto.id}>Quitar Producto</button></td>
        </tr>`;
    })
    document.getElementById("productos-agregados").innerHTML = filasCarrito;
    precioTotal()
}

function precioTotal() {
    let precioTotal = 0;
    carrito.forEach((producto) => {
        precioTotal += producto.price * producto.qty
    })
    document.getElementById("precioTotal").innerHTML = `<div>
    <p>TOTAL: $${precioTotal}</p>
    </div>`;
}

document.getElementById("productos-agregados").onclick = (e) => {
    let productoEliminado = carrito.findIndex((p) => p.id == e.target.id);
    if (e.target.className === "remove") {
        carrito.splice(productoEliminado, 1)
    } else if (e.target.className === "remove-one") {
        let newQty = carrito[productoEliminado].qty - 1
        if (newQty > 0) {
            carrito[productoEliminado].qty = newQty
        } else {
            carrito.splice(productoEliminado, 1)
        }
    } else if (e.target.className === "add-one") {
        carrito[productoEliminado].qty++
    } 
    mostrarCarrito()
    document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

mostrarCarrito()

document.getElementById("myDropdown").addEventListener("click", function(e) {
    e.stopPropagation();
});

document.querySelector('body').onclick = (e) => {
    console.log('---------------------------------')
    console.log(e.target)
}

Toastify({
    text: "Envío gratis con tu compra mayor a $1500",
    duration: 5000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    offset: {
        x: 10,
        y: 800,
    },    stopOnFocus: true,
    style: {
      background: "#696969",
    },
    onClick: function(){}
  }).showToast();