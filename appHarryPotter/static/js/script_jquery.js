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






// ------------------------------------------------
// ROTACIÓN DE RAZAS
// Otro .js aparte
// ------------------------------------------------



// ------------------------------------------------
    // MOVER LOS ELEMENTOS DE DESCRIPCIONES DE ENTIDADES
let rotationCount = 0;

function moverElementos() {
    // Como solo rotamos el primero y el tercero, cogemos sus coordenadas.
    // Para el segundo simplemento cogemos el elemento y le aplicamos un efecto diferente
    var firstOffset = $('.timeline-container-left').eq(0).offset();
    var secondElement = $('.timeline-container-right').eq(0);
    var thirdOffset = $('.timeline-container-left').eq(1).offset();

    if (rotationCount == 0) { //Esta funcionalidad solo con la primera llamada a la función
        // Mover el primer div al segundo
        $('.timeline-container-left').eq(0).animate({
            top: thirdOffset.top - firstOffset.top,
            left: thirdOffset.left - firstOffset.left
        }, 2500); // Animación durante 2.5s

        // Mover el tercer div al primero
        $('.timeline-container-left').eq(1).animate({
            top: firstOffset.top - thirdOffset.top,
            left: firstOffset.left - thirdOffset.left
        }, 2500);

        // Efectos para el segundo div (a la derecha)
        secondElement.css({
            transition: "transform 1.5s ease, opacity 1.5s ease",
            transform: "rotateY(360deg) scale(1.2)", 
            opacity: 0.5 
        });

        setTimeout(function () {
            secondElement.css({
                transform: "rotateY(0deg) scale(1)",
                opacity: 1 // Restaurar opacidad
            });
        }, 1500);
    }
    // Para el resto de ejecuciones
    else {
        // Mismo efecto para todos
        $('.timeline-container-left').eq(0).css({
            transition: "transform 1.5s ease, opacity 1.5s ease",
            transform: "rotateY(360deg) scale(1.2)",
            opacity: 0.5
        });

        $('.timeline-container-left').eq(1).css({
            transition: "transform 1.5s ease, opacity 1.5s ease",
            transform: "rotateY(360deg) scale(1.2)",
            opacity: 0.5
        });

        secondElement.css({
            transition: "transform 1.5s ease, opacity 1.5s ease",
            transform: "rotateY(360deg) scale(1.2)", 
            opacity: 0.5 
        });

        setTimeout(function () {
            $('.timeline-container-left').eq(0).css({
                transform: "rotateY(0deg) scale(1)",
                opacity: 1
            });

            $('.timeline-container-left').eq(1).css({
                transform: "rotateY(0deg) scale(1)",
                opacity: 1
            });
            secondElement.css({
                transform: "rotateY(0deg) scale(1)",
                opacity: 1 // Restaurar opacidad
            });
        }, 1500);
    }

    rotationCount++;
}

moverElementos();
setInterval(moverElementos, 7000);
// ------------------------------------------------
});