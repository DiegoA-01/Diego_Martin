document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".btn-agregar");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {

            const producto = {
                nombre: boton.dataset.nombre,
                precio: boton.dataset.precio,
                imagen: boton.dataset.imagen
            };

            
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            
            carrito.push(producto);

            
            localStorage.setItem("carrito", JSON.stringify(carrito));

            mostrarToast(`${producto.nombre} agregado al carrito 🛒`);
            
        });
    });

});

function mostrarToast(mensaje, color = "#4CAF50") {
    const toast = document.getElementById("toast");
    if (!toast) return; 

    toast.textContent = mensaje;
    toast.style.backgroundColor = color;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1500); 
}