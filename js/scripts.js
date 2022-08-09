const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("cart-total").innerHTML = carrito.length;


const productos = [
    {
        id: 1, 
        title:"Pizza Napolitana", 
        price: 500,
        image: "https://cdn7.kiwilimon.com/recetaimagen/13003/640x426/5707.jpg.webp",
        category: "Pizzas"
    },

    {
        id: 2, 
        title:"Pizza Caprese", 
        price: 5000,
        image: "https://static-sevilla.abc.es/media/gurmesevilla/2013/04/pizza-margarita.jpg",
        category: "Pizzas"

    },

    {
        id: 3, 
        title:"Roll Salmon", 
        price: 50,
        image: "https://t1.rg.ltmcdn.com/es/posts/8/0/4/sushi_con_wasabi_39408_600_square.jpg",
        category: "Sushi"
    },

]

function imprimirCards(producto) {
    const idButton = `add-cart${producto.id}`
    document.getElementById("seccion-card").innerHTML += `<div class="col mb-5">
        <div class="card h-100">
            <img class="card-img-top" src="${producto.image}"/>
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${producto.title}</h5>
                    <span class="text-muted">${producto.price}</span>
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

// const quitarProducto = (producto) => {
//     const idQuitar = `remove-cart${producto.id}`
//     document.getElementById("productos-agregados").innerHTML += 
//     `<tr>
//     <td>${producto.title}</td>
//     <td><img src="${producto.image}" style="width: 100px"></td>
//     <td>${producto.price}</td>
//     <td><button id=${idQuitar}>Quitar Producto</button>
//     </tr>`
//     document.getElementById("idQuitar").onclick = () => {
//         carrito.splice(producto.id)
//     }
// }

function productosEnCarrito(producto) {
    let productoEliminado = carrito.findIndex(p => p.id === producto.id);
    console.log(productoEliminado)
    const idQuitar = `remove-cart${productoEliminado}`
    const filaCarrito = `fila-cart${productoEliminado}`;
    document.getElementById("productos-agregados").innerHTML += 
    `<tr id=${filaCarrito}>
    <td>${producto.title}</td>
    <td><img src="${producto.image}" style="width: 100px"></td>
    <td>${producto.price}</td>
    <td><button id=${idQuitar}>Quitar Producto</button></td>
    </tr>`
    document.getElementById(idQuitar).onclick = () => {
        carrito.splice(productoEliminado)
        document.getElementById(filaCarrito).remove()
        document.getElementById("cart-total").innerHTML = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

// function productosEnCarrito(producto) {
//     document.getElementById("productos-agregados").innerHTML += 
//     `<tr>
//     <td>${producto.title}</td>
//     <td><img src="${producto.image}" style="width: 100px"></td>
//     <td>${producto.price}</td>
//     <td><button>Quitar Producto</button></td>
//     </tr>`  
// }

carrito.forEach((producto) => {
    productosEnCarrito(producto)
})

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    document.getElementById(idButton).onclick = () => {
        carrito.push(producto);
        document.getElementById("cart-total").innerHTML = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito))
        productosEnCarrito(producto)
    }
})