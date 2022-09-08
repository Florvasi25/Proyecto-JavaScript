// GUARDAR DATOS EN LOCAL STORAGE

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
document.getElementById("cart-total").innerHTML = calcularTotalCarrito();

// TRAER PRODUCTOS JSON MEDIANTE PROMESAS

const getProducts = async () => {
    const response = await fetch("./productos.json");
    const data = await response.json();
    return data;
};

(async () => {
    const productos = await getProducts();
    const listaLateral = document.getElementById("categoria");
    const tituloSeccion = document.getElementById("tituloSeccion");
    const categoriasFiltradas = [
        ...new Set(productos.map((producto) => producto.category)),
    ];

    // CREAR BARRA LATERAL CON SECCIONES

    categoriasFiltradas.forEach((categoria) => {
        tituloSeccion.innerHTML += `<p class="d-flex tituloCategoria" id="scrollInto${categoria}">${categoria}<div id="titulo${categoria}" class="d-flex"></div></p>`;
        let anchor = document.createElement("a");
        anchor.id = `boton${categoria}`;
        anchor.className = `nav-link subtituloCategoria`;
        anchor.setAttribute("data-categoria", categoria);
        anchor.innerHTML = categoria;
        anchor.onclick = () => {
            document.getElementById(`scrollInto${categoria}`).scrollIntoView({ behavior: "smooth" });
        };
        listaLateral.appendChild(anchor);
    });

    productos.forEach((producto) => {
        imprimirCategorias(producto);
    });

    imprimirFavoritos();

    productos.forEach((producto) => {
        agregarAlCarrito(producto);
    });
})();

// TITULO SECCIONES

function imprimirCategorias(producto) {
    let ctg = producto.category;
    let idTitulo = `titulo${ctg}`;
    document.getElementById(idTitulo).appendChild(crearCard(producto));
}

// CREAR CARDS

function crearCard(producto) {
    const idButton = `add-cart${producto.id}`;
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "col mb-5");
    divCard.setAttribute("type", "button");
    divCard.setAttribute("id", "cardBody");
    let card = `<div class="card">
        <div class="ubicacionBotonFav"></div>
        <img class="card-img-top" src="${producto.image}"/>
        <div class="card-body p-2">
            <div class="text-center">
                <h4 class="fw-bolder">${producto.name}</h4>
                <p class="description fs-">${producto?.description || ""}</p>
                <span style="font-size:20px">$${producto.price}</span>
            </div>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
                <button class="btn btn-outline-dark mt-auto" name="${idButton}">Agregar</button>
            </div>
        </div>
    </div>`;
    divCard.innerHTML = card;
    const ubiBotonFav = divCard.getElementsByClassName("ubicacionBotonFav")[0];
    let anchorFav = createFavButton(producto);
    ubiBotonFav.appendChild(anchorFav);
    return divCard;
}

// CREAR FUNCIONALIDAD AL BOTÓN DE FAVORITOS

function createFavButton(producto) {
    const botonFav = `add-fav${producto.id}`;
    let anchorFav = document.createElement("a");
    anchorFav.innerHTML = `<img class="imgFav" name="favIcon${producto.id}" src="./Imagenes/favIcon.png">`;
    anchorFav.className = `badge text-white position-absolute`;
    anchorFav.style.cssText = `top: 0.5rem; right: 0.5rem`;
    anchorFav.setAttribute("name", botonFav);
    anchorFav.onclick = () => {
        let indexFavorito = favoritos.findIndex((p) => p.id === producto.id);
        if (indexFavorito == -1) {
            favoritos.push(producto);
        } else {
            favoritos.splice(indexFavorito, 1);
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        imprimirFavoritos();
        agregarAlCarrito(producto);
    };
    return anchorFav;
}

// IMPRIMIR FAVORITOS

function imprimirFavoritos() {
    document.getElementById("cardsFavorite").innerHTML = "";
    let todosFavBotons = document.getElementsByClassName("imgFav");
    for (let icono of todosFavBotons) {
        icono.src = "./Imagenes/favIcon.png";
    }
    favoritos.forEach((producto) => {
        document.getElementById("cardsFavorite").appendChild(crearCard(producto));
        let botonesFav = document.getElementsByName(`favIcon${producto.id}`);
        botonesFav.forEach((icono) => {
            icono.src = "./Imagenes/favIconFull.png";
        });
    });
    const ubicacionTituloFav = document.getElementById("textoVacio");
    ubicacionTituloFav.innerHTML = "";
    if (favoritos.length > 0) {
        let tituloFavorito = document.createElement("p");
        tituloFavorito.className = `tituloCategoria d-flex`;
        tituloFavorito.innerHTML = `Favoritos`;
        ubicacionTituloFav.appendChild(tituloFavorito);
    }
}

// AGREGAR AL CARRITO

function agregarAlCarrito(producto) {
    const idButton = `add-cart${producto.id}`;
    const addToCartButton = document.getElementsByName(idButton);
    addToCartButton.forEach((boton) => {
        boton.onclick = () => {
            let indexProductoAgregado = carrito.findIndex((p) => p.id === producto.id);
            if (indexProductoAgregado !== -1) {
                carrito[indexProductoAgregado].qty += 1;
            } else {
                producto.qty = 1;
                carrito.push(producto);
            }
            swal({
                text: `Agregaste ${producto.name} a tu pedido`,
                icon: "success",
                buttons: false,
                timer: 1500,
            });
            document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        };
    });
}

// MOSTRAR PRODUCTOS DENTRO DEL CARRITO

function mostrarCarrito() {
    let filasCarrito = "";
    carrito.forEach((producto) => {
        filasCarrito += `<tr>
            <td class="colCarrito">
                <div class="me-lg-3 me-md-3 text-wrap" style="width:125px">
                    ${producto.name}
                </div>
                <div>
                    <img src="${producto.image}" style="width: 100px">
                </div>
            </td>
            <td>
                <div class="cantidad">
                    <button name="remove-one" class="btn btn-outline-dark mt-auto me-1" id=${producto.id}>-</button>
                    ${producto.qty}
                    <button name="add-one" class="btn btn-outline-dark mt-auto ms-1" id=${producto.id}>+</button>
                </div>
            </td>
            <td>
                $${producto.price * producto.qty}
            </td>
            <td>
                <button name="remove" class="btn btn-outline-dark mt-auto" id=${producto.id}>Quitar</button>
            </td>
        </tr>`;
    });
    document.getElementById("productos-agregados").innerHTML = filasCarrito;
    precioTotal();
}

// FUNCIONALIDAD BOTONES DENTRO DEL CARRITO

document.getElementById("productos-agregados").onclick = (e) => {
    let productoEliminado = carrito.findIndex((p) => p.id == e.target.id);
    if (e.target.getAttribute("name") === "remove") {
        carrito.splice(productoEliminado, 1);
    } else if (e.target.getAttribute("name") === "remove-one") {
        let newQty = carrito[productoEliminado].qty - 1;
        if (newQty > 0) {
            carrito[productoEliminado].qty = newQty;
        } else {
            carrito.splice(productoEliminado, 1);
        }
    } else if (e.target.getAttribute("name") === "add-one") {
        carrito[productoEliminado].qty++;
    }
    mostrarCarrito();
    document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

document.getElementById("myDropdown").addEventListener("click", function (e) {
    e.stopPropagation();
});

// OPERACIONES DENTRO DEL CARRITO

function calcularTotalCarrito() {
    let totalProductos = 0;
    carrito.forEach((producto) => {
        totalProductos += producto.qty;
    });
    return totalProductos;
}

function precioTotal() {
    let precioTotal = 0;
    carrito.forEach((producto) => {
        precioTotal += producto.price * producto.qty;
    });
    document.getElementById("precioTotal").innerHTML = `<div>
        <p class="total">TOTAL: $${precioTotal}</p>
    </div>`;
}

mostrarCarrito();

// MENSAJE TEMPORAL

Toastify({
    text: "Envío gratis con tu compra mayor a $3500",
    duration: 5000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    offset: {
        x: 10,
        y: 800,
    },
    stopOnFocus: true,
    style: {
        background: "#696969",
    },
    onClick: function () { },
}).showToast();
