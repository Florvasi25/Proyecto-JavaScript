const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
document.getElementById("cart-total").innerHTML = calcularTotalCarrito();

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

  categoriasFiltradas.forEach((categoria) => {
    tituloSeccion.innerHTML += `<p class="d-flex tituloCategoria" id="scrollInto${categoria}">${categoria}<div id="titulo${categoria}" class="d-flex"></div></p>`;
    let anchor = document.createElement("a");
    anchor.id = `boton${categoria}`;
    anchor.className = `nav-link subtituloCategoria`;
    anchor.setAttribute("data-categoria", categoria);
    anchor.innerHTML = categoria;
    anchor.onclick = () => {
      document.getElementById(`scrollInto${categoria}`).scrollIntoView();
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

function createFavButton(producto) {
  const botonFav = `add-fav${producto.id}`;
  let anchorFav = document.createElement("a");
  anchorFav.textContent = `F`;
  anchorFav.className = `badge bg-dark text-white position-absolute`;
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
    // agregarAFavorito(producto)
    agregarAlCarrito(producto);
  };
  return anchorFav;
}

function agregarAlCarrito(producto) {
  const idButton = `add-cart${producto.id}`;
  const addToCartButton = document.getElementsByName(idButton);
  addToCartButton.forEach((boton) => {
    boton.onclick = () => {
      let indexProductoAgregado = carrito.findIndex(
        (p) => p.id === producto.id
      );
      if (indexProductoAgregado !== -1) {
        carrito[indexProductoAgregado].qty += 1;
      } else {
        producto.qty = 1;
        carrito.push(producto);
      }
      // swal({
      //     title: "Excelente!",
      //     text: `Agregaste ${producto.name} a tu pedido`,
      //     icon: "success",
      //     button: "OK",
      //   });
      document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };
  });
}

function calcularTotalCarrito() {
  let totalProductos = 0;
  carrito.forEach((producto) => {
    totalProductos += producto.qty;
  });
  return totalProductos;
}

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
            <span class="text-muted">$${producto.price}</span>
            </div>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
            <button class="btn btn-outline-dark mt-auto" name="${idButton}">Añadir al carrito</button>
            </div>
        </div>
    </div>`;
  divCard.innerHTML = card;
  const ubiBotonFav = divCard.getElementsByClassName("ubicacionBotonFav")[0];
  let anchorFav = createFavButton(producto);
  ubiBotonFav.appendChild(anchorFav);
  return divCard;
}

function imprimirCategorias(producto) {
  let ctg = producto.category;
  let idTitulo = `titulo${ctg}`;
  document.getElementById(idTitulo).appendChild(crearCard(producto));
}

function imprimirFavoritos() {
  document.getElementById("cardsFavorite").innerHTML = "";
  favoritos.forEach((producto) => {
    document.getElementById("cardsFavorite").appendChild(crearCard(producto));
  });
}

function mostrarCarrito() {
  let filasCarrito = "";
  carrito.forEach((producto) => {
    filasCarrito += `<tr>
        <td class="colCarrito">
            <div class="me-3">${producto.name}</div>
            <div><img src="${producto.image}" style="width: 100px"></div>
        </td>
        <td class="cantidad">
        <button class="remove-one btn btn-outline-dark mt-auto me-2" id=${producto.id}>-</button>
        ${producto.qty}
        <button class="add-one btn btn-outline-dark mt-auto ms-2" id=${producto.id}>+</button>
        </td>
        <td>$${producto.price * producto.qty}</td>
        <td><button class="remove btn btn-outline-dark mt-auto" id=${producto.id}>Quitar</button></td>
    </tr>`;
  });
  document.getElementById("productos-agregados").innerHTML = filasCarrito;
  precioTotal();
}

function precioTotal() {
  let precioTotal = 0;
  carrito.forEach((producto) => {
    precioTotal += producto.price * producto.qty;
  });
  document.getElementById("precioTotal").innerHTML = `<div>
    <p>TOTAL: $${precioTotal}</p>
    </div>`;
}

document.getElementById("productos-agregados").onclick = (e) => {
  let productoEliminado = carrito.findIndex((p) => p.id == e.target.id);
  if (e.target.className === "remove") {
    carrito.splice(productoEliminado, 1);
  } else if (e.target.className === "remove-one") {
    let newQty = carrito[productoEliminado].qty - 1;
    if (newQty > 0) {
      carrito[productoEliminado].qty = newQty;
    } else {
      carrito.splice(productoEliminado, 1);
    }
  } else if (e.target.className === "add-one") {
    carrito[productoEliminado].qty++;
  }
  mostrarCarrito();
  document.getElementById("cart-total").innerHTML = calcularTotalCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

mostrarCarrito();

document.getElementById("myDropdown").addEventListener("click", function (e) {
  e.stopPropagation();
});

Toastify({
  text: "Envío gratis con tu compra mayor a $1500",
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
  onClick: function () {},
}).showToast();
