$(document).ready(function () {
    let images = $('#scroll img'); // Selecciona las imágenes
    let index = 0;

    function cambiaFondo() {
        // Selecciono la imagen que se está visualizando
        let imgSrc = $(images[index]).attr('src'); // Guardo su ruta
    
        let img = new Image();
        img.src = imgSrc; // le adjunto la ruta
    
        img.onload = function () {
            // Tamaño de la pantalla
            let screenWidth = window.innerWidth;
            let screenHeight = window.innerHeight;
    
            // Ajusta el tamaño de la imagen para cubrir toda la pantalla
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
    
            canvas.width = screenWidth;
            canvas.height = screenHeight;
    
            // Ajusta el tamaño manteniendo las proporciones
            let scale = Math.max(screenWidth / img.width, screenHeight / img.height);
            let x = (screenWidth - img.width * scale) / 2;
            let y = (screenHeight - img.height * scale) / 2;
    
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    
            // Convierte la imagen redimensionada en un data URL
            let resizedImgSrc = canvas.toDataURL();
    
            // Cambia el fondo con un efecto de desvanecimiento
            $('.hero-section').fadeOut(500, function () {
                $(this).css('background-image', `url(${resizedImgSrc})`).fadeIn(2000);
            });
    
            // Incrementa el índice para la siguiente imagen
            index = (index + 1) % images.length;
        };
    }

    // Oculta las imágenes originales
    $('#scroll').hide();

    // Inicia la rotación
    cambiaFondo();
    setInterval(cambiaFondo, 3000);



    // Mostrar párrafos después de evento CLICK
    // $("#p1").fadeIn("slow");
    // setTimeout(function () {
    //     $("#p2").fadeIn("slow");
    // }, 1500); 
    $('.ratio').css('display', 'none');
    $("#startButton").on("click", function () {
        // Eliminar el botón
        $(this).remove();

        // Mostrar #p1 con fadeIn
        $("#p1").fadeIn("slow", function () {
            // Una vez que #p1 se muestre, mostrar #p2 con delay
            setTimeout(function () {
                $("#p2").fadeIn("slow");
            }, 1500);
        });

        $('.ratio').show();
        $('.ratio').css({
            position: 'relative',
            top: '-400px', // Comienza un poco más arriba
            opacity: 0     // Empieza invisible
        });
    
        // Evento que activa el efecto al cargar la página
        $('.ratio').animate(
            {
                top: '0px',       // Llega a su posición final
                opacity: 1        // Se hace visible gradualmente
            },
            2800,                // Duración en milisegundos (1.2 segundos)
            'easeOutElastic'       // Efecto de movimiento suave (requiere jQuery UI)
        );
    });







    // Rotación de las razas
    // En otro .js aparte




    // MOVER LOS ELEMENTOS DE DESCRIPCIONES DE ENTIDADES
    // function moverElementos() {
    //     // Obtener las posiciones actuales de cada contenedor de la timeline
    //     var firstOffset = $('.timeline-container-left').eq(0).offset();
    //     var secondOffset = $('.timeline-container-right').eq(0).offset();
    //     var thirdOffset = $('.timeline-container-left').eq(1).offset();

    //     // Mover el primer div al segundo
    //     $('.timeline-container-left').eq(0).animate({
    //         top: secondOffset.top - firstOffset.top,
    //         left: secondOffset.left - firstOffset.left
    //     }, 1000);

    //     // Mover el segundo div al tercero
    //     $('.timeline-container-right').eq(0).animate({
    //         top: thirdOffset.top - secondOffset.top,
    //         left: thirdOffset.left - secondOffset.left
    //     }, 1000);

    //     // Mover el tercer div al primero
    //     $('.timeline-container-left').eq(1).animate({
    //         top: firstOffset.top - thirdOffset.top,
    //         left: firstOffset.left - thirdOffset.left
    //     }, 1000);
    // }

    // // Llamamos a la función para mover los elementos al cargarse la página
    // moverElementos();

});