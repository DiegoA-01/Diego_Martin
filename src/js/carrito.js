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

    // 🔑 TU API KEY
    const GEMINI_API_KEY = "AIzaSyBnhC_MO1OrXUAuhieYpFnUsKupHGC5sLU";

    // 📦 PRODUCTOS
    const products = [
        { name: "Camiseta Deportiva", price: 50000, description: "Camiseta cómoda para actividades deportivas." },
        { name: "Guayos Adidas", price: 250000, description: "Guayos profesionales para fútbol." },
        { name: "Buzo Deportivo", price: 120000, description: "Buzo abrigado para entrenamientos." },
        { name: "Pantaloneta con licra", price: 80000, description: "Pantaloneta resistente con licra." }
    ];

    document.getElementById('get-recommendations').addEventListener('click', async () => {

        const userQuery = document.getElementById('user-query').value.trim();

        if (!userQuery) {
            mostrarToast('Por favor, describe lo que buscas.', '#f44336');
            return;
        }

        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const results = document.getElementById('results');

        loading.style.display = 'block';
        error.style.display = 'none';
        results.innerHTML = '';

        // 📌 Resumen optimizado de productos
        const productSummary = products
            .map(p => `${p.name} (${p.description}) - $${p.price}`)
            .join('\n');

        // 🧠 PROMPT OPTIMIZADO
        const prompt = `Eres un asistente de recomendaciones de productos.

Productos disponibles:
${productSummary}

Consulta del usuario: "${userQuery}"

Instrucciones:
- Recomienda SOLO productos de la lista.
- NO inventes productos.
- Máximo 3 recomendaciones.
- Si no hay coincidencia exacta, sugiere lo más cercano.

Formato de respuesta (OBLIGATORIO):
Nombre del producto: breve razón

No agregues texto adicional.`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }]
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en la API:', response.status, errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Respuesta de Gemini:', data);

            if (
                !data.candidates ||
                !data.candidates[0] ||
                !data.candidates[0].content ||
                !data.candidates[0].content.parts ||
                !data.candidates[0].content.parts[0]
            ) {
                throw new Error('Respuesta de API inválida o incompleta.');
            }

            const aiResponse = data.candidates[0].content.parts[0].text;

            if (!aiResponse) {
                throw new Error("La IA no devolvió contenido.");
            }

            // 🧩 Procesar respuesta de forma segura
            const recommendations = aiResponse
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            results.innerHTML = recommendations.map(rec => {
                const parts = rec.split(':');
                const name = parts[0]?.trim() || 'Producto';
                const reason = parts.slice(1).join(':').trim() || 'Recomendación no disponible';

                return `
                    <div class="card">
                        <h3>${name}</h3>
                        <p>${reason}</p>
                    </div>
                `;
            }).join('');

        } catch (err) {
            console.error('Error completo:', err);
            error.textContent = `Error al obtener recomendaciones: ${err.message}`;
            error.style.display = 'block';
        } finally {
            loading.style.display = 'none';
        }
    });

});

// 🔔 TOAST
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