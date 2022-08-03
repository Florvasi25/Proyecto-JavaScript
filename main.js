const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
document.getElementById("cart-total").innerHTML = `${carrito.length} - $${total}`;

const productos = [
    {
        id:1,
        title:"Pizza Calabresa",
        img: "https://www.hola.com/imagenes/cocina/recetas/20220208204252/pizza-pepperoni-mozzarella/1-48-890/pepperoni-pizza-abob-c.jpg",
        price: 500,
        category: "Pizzas"
    },
    {
        id:2,
        title:"Hamburguesa con Queso",
        img: "https://assets.unileversolutions.com/recipes-v2/218401.jpg",
        price: 400,
        category: "Hamburguesas"

    },
    {
        id:3,
        title:"Pizza Margarita",
        img: "https://www.saborusa.com/do/wp-content/uploads/sites/8/2019/11/Animate-a-disfrutar-una-deliciosa-pizza-de-salchicha-Foto-destacada.png",
        price: 600,
        category: "Pizzas"

    },
];

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}` 
    document.getElementById("seccion-card").innerHTML += `<div class="card">
        <img src="${producto.img}">
        <h4>${producto.title}</h4>
        <div class="precio">
            <p>$${producto.price}</p>
        </div>
        <a class="boton" id="${idButton}" data-id="${producto.id}">Añadir Al Carrito</a>
    </div>`;
})

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}` 
    document.getElementById(idButton).addEventListener('click', () => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
        document.getElementById("cart-total").innerHTML = `${carrito.length} - $${total}`;
        document.getElementById("cart-elements").innerHTML = ""
        carrito.forEach((producto) => {
            document.getElementById("cart-elements").innerHTML += `<tr>
                <td>${producto.title}</td>
                <td><img src="${producto.img}" style="width:200px"></td>
                <td>${producto.price}</td>
                <td><button>Quitar</button></td>
            </tr>`
        })
    })
});