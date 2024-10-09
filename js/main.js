let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


let productos = []
    fetch("../js/productos.json")
    .then(response => response.json())
    .then (data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const numerito = document.querySelector("#numerito");
const botonComprar = document.querySelector("#carrito-acciones-comprar")


function cargarProductos(productos) {

    productos.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("producto");

    div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-agregar");
    button.innerText = "AGREGAR AL CARRITO";

    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
        Toastify({
            text: "Agregaste un producto al carrito",
            duration: 3000,
            close: true,
            style: {
                background: "linear-gradient(to right, rgb(255, 187, 60), rgb(255, 105, 5))",
                color: "black",
            },
        }).showToast();
    });

    div.append(button);
    contenedorProductos.append(div);

});
}


function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="producto-imagenes" src="${producto.imagen}" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.precio * producto.cantidad}</p>
            `;

            let buttonAumentar = document.createElement("button");
            buttonAumentar.classList.add("producto-agregar");
            buttonAumentar.innerText = "+";
            buttonAumentar.addEventListener("click", () => {
                aumentarCantidad(producto);
            });

            div.append(buttonAumentar);

            let buttonReducir = document.createElement("button");
            buttonReducir.classList.add("producto-agregar");
            buttonReducir.innerText = "-";
            buttonReducir.addEventListener("click", () => {
                reducirCantidad(producto);
            })
            div.append(buttonReducir);

            let button = document.createElement("button");
            button.classList.add("producto-agregar");
            button.innerText = "Borrar";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });
            div.append(button);
            carritoProductos.append(div);

            button.addEventListener ("click", () => {
                Toastify({
                    text: "Borraste un producto del carrito",
                    duration: 3000,
                    close: true,
                    style: {
                        color: "black",
                      },
                  }).showToast();
            })
        });
        
    }
    actualizarTotal();
        localStorage.setItem("carrito", JSON.stringify(carrito));
}


function agregarAlCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
    actualizarNumerito();
}


function aumentarCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    }
    actualizarCarrito();
}


function reducirCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado.cantidad >= 2) {
        itemEncontrado.cantidad--;
        actualizarCarrito();
    } else {
        borrarDelCarrito(itemEncontrado);
    }
}


function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);

    actualizarCarrito();
    actualizarNumerito();
}


function actualizarTotal(){
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
    
}


function actualizarNumerito() {
    let nuevoNumerito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
