const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("cart-total").innerHTML = carrito.length;

const productos = [
    {
        id: 1, 
        name:"Pizza Napolitana", 
        price: 1200,
        image: "./Imagenes/pizza-1.png",
        category: "Pizzas",
        quantity: 0
    },

    {
        id: 2, 
        name:"Pizza Nduja", 
        price: 1300,
        image: "./Imagenes/pizza-2.png",
        description: "Pizza con salchicha italiana picante.",
        category: "Pizzas",
        quantity: 0
    },

    {
        id: 3, 
        name:"Hamburguesa con Queso", 
        price: 1100,
        image: "./Imagenes/hamburguesa-1.png",
        category: "Hamburguesas",
        quantity: 0
    },

    {
        id: 4, 
        name:"Hamburguesa con Huevo", 
        price: 1050,
        image: "./Imagenes/hamburguesa-2.png",
        description: "Hamburguesa de carne 100% vacuna.",
        category: "Hamburguesas",
        quantity: 0
    },

]

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
        <td>${producto.name}</td>
        <td><img src="${producto.image}" style="width: 100px"></td>
        <td class="cantidad"><button>-</button> ${producto.quantity} <button>+</button></td>
        <td>$${producto.price}</td>
        <td><button class="remove" id=${producto.id}>Quitar Producto</button></td>
        </tr>`;
    })
    document.getElementById("productos-agregados").innerHTML = filasCarrito;
}

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    document.getElementById(idButton).onclick = () => {
        carrito.push(producto); 
        swal({
            title: "Excelente!",
            text: `Agregaste ${producto.name} a tu pedido`,
            icon: "success",
            button: "OK",
          });   
        document.getElementById("cart-total").innerHTML = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito()
    }
})

document.getElementById("productos-agregados").onclick = (e) => {
    if (e.target.className === "remove") {
        let productoEliminado = carrito.findIndex((p) => p.id === e.target.id);
        carrito.splice(productoEliminado, 1)
        mostrarCarrito()
        document.getElementById("cart-total").innerHTML = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
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