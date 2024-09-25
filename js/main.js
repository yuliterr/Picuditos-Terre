let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const productos = [
    {
         id: "buzo-animales-claro",
         titulo: "Animales claros",
         imagen: "../fotos/buzo animales claro.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 15000
    }, 
    {
         id: "buzo-animales-oscuro",
         titulo: "Animales oscuros",
         imagen: "../fotos/buzo animales negro.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 15000
     },
     {
         id: "buzo-combinado-claro",
         titulo: "Combinado",
         imagen: "../fotos/buzo combinado claro.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 18000
     },
     {
         id: "buzo-combinado-oscuro",
         titulo: "Combinado",
         imagen: "../fotos/buzo combinado osc.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 18000
     },
     {
         id: "buzo-rosa",
         titulo: "Buzo rosa",
         imagen: "../fotos/buzo rosa.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 13000
     },
     {
         id: "buzo-y-pantalon",
         titulo: "Buzo y pantalon",
         imagen: "../fotos/buzo y pantalon.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 22000
     },
     {
         id: "buzo-snupy-n",
         titulo: "Buzo snopy",
         imagen: "../fotos/buzo snopi naranja.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 15000
     },
     {
         id: "buzo-snupy-c",
         titulo: "Buzo snopy",
         imagen: "../fotos/buzo snupi claro.jpg",
         categoria: {
             nombre: "buzo",
             id: "buzo"
         },
         precio: 15000
     },
 ];


const contenedorProductos = document.querySelector("#contenedor-productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

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
    });

    div.append(button);
    contenedorProductos.append(div);
});

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
}

function actualizarTotal(){
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
    
}

actualizarCarrito();

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}