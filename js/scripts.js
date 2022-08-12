const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("cart-total").innerHTML = carrito.length;



const productos = [
    {
        id: 1, 
        title:"Pizza Napolitana", 
        price: 1200,
        image: "./Imagenes/pizza-1.png",
        category: "Pizzas"
    },

    {
        id: 2, 
        title:"Pizza Nduja", 
        price: 1300,
        image: "./Imagenes/pizza-2.png",
        description: "Pizza con salchicha italiana picante.",
        category: "Pizzas"

    },

    {
        id: 3, 
        title:"Hamburguesa con Queso", 
        price: 1100,
        image: "./Imagenes/hamburguesa-1.png",
        category: "Hamburguesas"
    },

    {
        id: 4, 
        title:"Hamburguesa con Huevo", 
        price: 1050,
        image: "./Imagenes/hamburguesa-2.png",
        description: "Hamburguesa de carne 100% vacuna.",
        category: "Hamburguesas"
    },

]

function imprimirCards(producto) {
    const idButton = `add-cart${producto.id}`
    document.getElementById("seccion-card").innerHTML += `<div class="col mb-5">
        <div class="card">
            <img class="card-img-top" src="${producto.image}"/>
            <div class="card-body p-4">
                <div class="text-center">
                    <h4 class="fw-bolder">${producto.title}</h4>
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

for (const nodoHTML of document.getElementsByClassName("filtrar-categoria")) {
    nodoHTML.onclick = (event) => {
        const categoria = event.target.getAttribute("data-categoria")
        filtrarProductosPorCategoria(categoria)
    }
}

function filtrarProductosPorCategoria(categoria) {
    document.getElementById("seccion-card").innerHTML = "";
    const productosFiltrados = productos.filter((producto) => producto.category === categoria);

    productosFiltrados.forEach((producto) => {
        imprimirCards(producto)
    })
}

productos.forEach((producto) => {
    imprimirCards(producto)
})

function mostrarCarrito() {
    let filasCarrito = "";
    carrito.forEach((producto) => {
        filasCarrito += `<tr>
        <td>${producto.title}</td>
        <td><img src="${producto.image}" style="width: 100px"></td>
        <td>$${producto.price}</td>
        <td><button class="remove" id=${producto.id}>Quitar Producto</button></td>
        </tr>`;
    } )
    document.getElementById("productos-agregados").innerHTML = filasCarrito;
}

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    document.getElementById(idButton).onclick = () => {
        carrito.push(producto);
        document.getElementById("cart-total").innerHTML = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito()
    }
})

document.getElementById("productos-agregados").onclick = (e) => {
    console.log(e.target)
    if (e.target.className === "remove") {
        let productoEliminado = carrito.findIndex((p) => p.id === e.target.id);
        carrito.splice(productoEliminado, 1)
        mostrarCarrito()
        document.getElementById("cart-total").innerHTML = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

mostrarCarrito()

swal("Quisiera acceder a un descuento?", {
    buttons: {
      cancel: "No gracias...",
      catch: {
        text: "Sí claro",
        value: "descuento",
      },
    },
  })
  .then((value) => {
    value === "descuento" ? swal("Aquí tiene su código de descuento: X8Y6S") : swal("Será la próxima :(");
  });