// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "producto-seco-01",
        titulo: "Pasta 01",
        imagen: "./imagenes/pasta-01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "secos"
        },
        precio: 1000
    },
    {
        id: "producto-seco-02",
        titulo: "Abrigo 02",
        imagen: "./imagenes/pasta-02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "secos"
        },
        precio: 1000
    },
    {
        id: "producto-seco-03",
        titulo: "Pasta 01",
        imagen: "./imagenes/pasta-03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "secos"
        },
        precio: 1000
    },
    {
        id: "producto-seco-04",
        titulo: "Pasta 01",
        imagen: "./imagenes/pasta-04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "secos"
        },
        precio: 1000
    },
    {
        id: "producto-fresco-01",
        titulo: "producto fresco",
        imagen: "./imagenes/producto-fresco-01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "frescos"
        },
        precio: 1000
    },
    // Camisetas
    {
        id: "producto-fresco-02",
        titulo: "producto fresco",
        imagen: "./imagenes/producto-fresco-02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "frescos"
        },
        precio: 1000
    },
    {
        id: "producto-fresco-03",
        titulo: "producto fresco",
        imagen: "./imagenes/producto-fresco-03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "frescos"
        },
        precio: 1000
    },
    {
        id: "producto-fresco-04",
        titulo: "producto fresco",
        imagen: "./imagenes/producto-fresco-04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "frescos"
        },
        precio: 1000
    },
    
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}