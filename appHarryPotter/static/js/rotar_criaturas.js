document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.criaturas-container');
    const items = Array.from(container.children); // Obtener todos los elementos

    function rotateBoxes() {
        if (items.length > 1) {
            const firstItem = items.shift(); // Sacar el primer elemento de la lista
            firstItem.style.transition = "transform 1s ease, opacity 1s ease, scale 1s ease";
            firstItem.style.transform = "rotate(360deg) scale(0.8)"; // Rotar y reducir tamaño
            firstItem.style.opacity = "0"; // Desaparecer gradualmente

            // Al final de la animación, recolocar el elemento
            firstItem.addEventListener('transitionend', function handler() {
                firstItem.style.transition = "none"; // Desactivar transiciones temporalmente
                firstItem.style.transform = "rotate(0deg) scale(1)"; // Reiniciar transformaciones
                firstItem.style.opacity = "1"; // Hacer visible nuevamente
                container.appendChild(firstItem); // Mover al final del contenedor
                items.push(firstItem); // Añadirlo al final de la lista
                firstItem.removeEventListener('transitionend', handler); // Limpiar el evento
            });
        }
    }

    // Llamar a la función cada 3 segundos
    setInterval(rotateBoxes, 3000);
});