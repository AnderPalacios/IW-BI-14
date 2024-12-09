document.querySelector('form').addEventListener('submit', function(event) {
    const checkboxes = document.querySelectorAll('input[name="categorias_peligro"]:checked');
    if (checkboxes.length === 0) {
        event.preventDefault();
        alert("Debe seleccionar al menos una categoría de peligro.");
    }
});