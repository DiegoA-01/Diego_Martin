document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    const usuarioRegistrado = JSON.parse(sessionStorage.getItem("usuarioRegistrado"));

    if(usuarioRegistrado && correo === usuarioRegistrado.correo && password === usuarioRegistrado.password) {
        
        sessionStorage.setItem("usuario", JSON.stringify({ nombre: usuarioRegistrado.nombre, correo }));

        mostrarToast("Bienvenido " + usuarioRegistrado.nombre + " 👋", "#4CAF50");

        setTimeout(() => {
            window.location.href = "tienda.html";
        }, 1000);
    } else {
        mostrarToast("Correo o contraseña incorrectos 😔", "#f44336");
    }
});


function mostrarToast(mensaje, color = "#4CAF50") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = mensaje;
    toast.style.backgroundColor = color;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}