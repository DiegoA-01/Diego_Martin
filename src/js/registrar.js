// registrar.js

document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    
    if(password !== confirmPassword) {
        mostrarToast("Las contraseñas no coinciden 😔", "#f44336");
        return;
    }

    
    
    const usuario = { nombre, correo, password };
    sessionStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

    mostrarToast("Usuario registrado con éxito ✅", "#4CAF50");

    
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
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