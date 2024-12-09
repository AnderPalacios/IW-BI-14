document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('#rotar_razas');
    const items = Array.from(container.children).filter(item => item.id !== "no_rotar");
    let counter = 0; // Contador para par o impar

    function rotateBoxes() {
        if (items.length > 1) {
            const firstItem = items.shift(); // Sacar el primer elemento de la lista
            counter++; 

            if (counter % 2 === 0) {
                // Efectos para cuando el contador es par (efectos 3 y 4)
                firstItem.style.transition = "transform 1s ease, opacity 1s ease";
                firstItem.style.transform = "rotateY(180deg) scale(0.8)"; // 3D
            } else {
                // Efectos para cuando el contador es impar (efectos 1 y 2)
                firstItem.style.transition = "transform 1s ease, opacity 1s ease";
                firstItem.style.transform = "rotate(360deg) scale(0.8)"; 
            }

            firstItem.style.opacity = "0"; // Desaparecer gradualmente

            firstItem.addEventListener('transitionend', function handler() {
                firstItem.style.transition = "transform 0.5s ease"; 
                firstItem.style.transform = "rotate(0deg) scale(1)"; 
                firstItem.style.opacity = "1"; 
                container.appendChild(firstItem); 
                items.push(firstItem); 
                firstItem.removeEventListener('transitionend', handler); 
            });
        }
    }

    // Cada 3 segundos
    setInterval(rotateBoxes, 3000);
});