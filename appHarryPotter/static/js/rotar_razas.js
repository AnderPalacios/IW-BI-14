document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('#rotar_razas');
    const items = Array.from(container.children).filter(item => item.id !== "no_rotar");
    let counter = 0; // Contador que inicia en 0 (par)

    function rotateBoxes() {
        if (items.length > 1) {
            const firstItem = items.shift(); // Sacar el primer elemento de la lista
            counter++; // Incrementar el contador

            // Determinar si el contador es par o impar
            if (counter % 2 === 0) {
                // Efectos para cuando el contador es par (efectos 3 y 4)
                firstItem.style.transition = "transform 1s ease, opacity 1s ease";
                firstItem.style.transform = "rotateY(180deg) scale(0.8)"; // Flip 3D y reducción de tamaño
            } else {
                // Efectos para cuando el contador es impar (efectos 1 y 2)
                firstItem.style.transition = "transform 1s ease, opacity 1s ease";
                firstItem.style.transform = "rotate(360deg) scale(0.8)"; // Rotación y reducción de tamaño
            }

            firstItem.style.opacity = "0"; // Desaparecer gradualmente

            // Al final de la animación, recolocar el elemento
            firstItem.addEventListener('transitionend', function handler() {
                firstItem.style.transition = "transform 0.5s ease"; // Desactivar transiciones temporalmente
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