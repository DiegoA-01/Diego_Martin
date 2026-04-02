document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".btn-agregar");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {

            const producto = {
                nombre: boton.dataset.nombre,
                precio: boton.dataset.precio,
                imagen: boton.dataset.imagen
            };

            // Obtener carrito actual
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Agregar producto
            carrito.push(producto);

            // Guardar en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert("Producto agregado al carrito 🛒");
        });
    });

});