document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.criaturas-container');
    const items = Array.from(container.children); 

    // Parecido a rotar razas pero aquí todos con mismo efecto
    function rotateBoxes() {
        if (items.length > 1) {
            const firstItem = items.shift(); 
            firstItem.style.transition = "transform 1s ease, opacity 1s ease, scale 1s ease";
            firstItem.style.transform = "rotate(360deg) scale(0.8)"; 
            firstItem.style.opacity = "0"; 

            // Al final de la animación, recolocar el elemento
            firstItem.addEventListener('transitionend', function handler() {
                firstItem.style.transition = "none"; 
                firstItem.style.transform = "rotate(0deg) scale(1)"; 
                firstItem.style.opacity = "1"; 
                container.appendChild(firstItem); 
                items.push(firstItem); 
                firstItem.removeEventListener('transitionend', handler); 
            });
        }
    }

    setInterval(rotateBoxes, 3000);
});