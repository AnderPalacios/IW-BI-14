// $(document).ready(function() {

//     let images = $('#scroll img'); // Selecciona todas las imágenes del contenedor
//     let index = 0;

//     function changeBackground() {
//         // Cambia el fondo de la sección con la imagen actual
//         let imgSrc = $(images[index]).attr('src');
//         $('.hero-section').css('background-image', `url(${imgSrc})`);

//         // Incrementa el índice para mostrar la siguiente imagen
//         index = (index + 1) % images.length;
//     }

//     // Inicia la rotación de las imágenes
//     changeBackground();
//     setInterval(changeBackground, 3000); // Cambia cada 3 segundos
// });

// $(document).ready(function () {
//     $('#scroll').cycle({
//         fx: 'scrollDown', // Tipo de transición
//         speed: 500,       // Velocidad de la transición
//         timeout: 3000,    // Tiempo entre transiciones
//         before: function (currSlide, nextSlide) {
//             // Obtén la imagen del próximo slide
//             let imgSrc = $(nextSlide).attr('src');
//             // Cambia el fondo del contenedor principal
//             $('.hero-section').css('background-image', `url(${imgSrc})`);
//         }
//     });
// });


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



    //Selector del <div> oculto
    // alert("ndjafhadbfhbdhbb");
    $("#p1").fadeIn("slow");
    setTimeout(function () {
        $("#p2").fadeIn("slow");
    }, 1500); 

    // alert("HOLAAAAAAAAAAAAAAAA");
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



    // Rotación de las razas
    // alert("ncjcndjncd");
    // const $container = $('.barista-section .row'); // Contenedor de los bloques
    // const $items = $container.find('.team-block-wrap'); // Obtener todos los elementos

    // function rotateBlocks() {
    //     if ($items.length > 1) {
    //         // const $firstItem = $items.first(); // Seleccionar el primer elemento
    //         const $firstItem = $items.eq(3)
    //         // alert($firstItem.html());
    //         $firstItem.animate(
    //             { opacity: 0 },
    //             {
    //                 duration: 1000,
    //                 step: function (now, fx) {
    //                     if (fx.prop === "opacity") {
    //                         const rotation = (1 - now) * 360; // Rotación inversa a la opacidad
    //                         $(this).css("transform", `rotateY(${rotation}deg) scale(${0.8 + 0.2 * now})`);
    //                     }
    //                 },
    //                 complete: function () {
    //                     // $items.each(function(index, element) {
    //                     //     alert($(element).prop('outerHTML')); // Muestra el HTML completo de cada elemento
    //                     // });
    //                     $firstItem.css("opacity", 1); // Restaurar opacidad
    //                     $firstItem.css("transform", "rotateY(0deg) scale(1)"); // Restaurar transformaciones
    //                     $container.append($firstItem); // Mover al final
    //                 },
    //             }
    //         );
    //     }
    // }

    // setInterval(rotateBlocks, 3000);



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