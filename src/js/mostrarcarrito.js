document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const mensajeVacio = document.getElementById("mensaje-vacio");

if (carrito.length === 0) {
    mensajeVacio.style.display = "flex";  
    contenedor.style.display = "none";    
    return;
} else {
    mensajeVacio.style.display = "none"; 
    contenedor.style.display = "grid";    
}

    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <img src="${producto.imagen}" >
            <br>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
            <hr>
        `;

        contenedor.appendChild(div);
    });

});

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    location.reload();
}