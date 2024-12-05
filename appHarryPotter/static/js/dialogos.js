$(document).ready(function() {
        // Inicializar el cuadro de diálogo
        $('#dialog').dialog({
            autoOpen: false,
            width: 700, // Cambiar el ancho
            height: 300, // Cambiar la altura
            dialogClass: 'custom-dialog', // Estilo personalizado
            buttons: {
                "Visitar": function() {
                    var link = $('#dialog_link').data('url');
                    window.location.href = link; // Redirige al enlace
                },
                "Cerrar": function() {
                    $(this).dialog("close");
                }
            }
        });
    
        // Abrir el cuadro de diálogo al hacer clic en el enlace
        $('#dialog_link').click(function(event) {
            event.preventDefault();
            $('#dialog').dialog('open');
        });
    
    
    
    // LO MISMO PARA LAS RAZAS
    
        $('#category-dialog').dialog({
            autoOpen: false,
            width: 700, // Ajustar ancho si es necesario
            height: 300, // Ajustar altura si es necesario
            dialogClass: 'custom-dialog', // Estilo personalizado
            buttons: {
                "Visitar": function() {
                    var link = $(this).data('url');
                    window.location.href = link; // Redirige al enlace
                },
                "Cerrar": function() {
                    $(this).dialog("close");
                }
            }
        });
    
        // Manejar clic en los enlaces de las categorías
        $('.category-link').click(function(event) {
            event.preventDefault();
            var categoryName = $(this).data('name');
            var categoryUrl = $(this).data('url');
    
            // Configurar el cuadro de diálogo con los datos de la categoría
            $('#category-name').text(categoryName);
            $('#category-dialog').data('url', categoryUrl).dialog('open');
        });
});