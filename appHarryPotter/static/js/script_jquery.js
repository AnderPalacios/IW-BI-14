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
        // Selecciona la imagen actual
        let imgSrc = $(images[index]).attr('src'); // Guardamos la ruta de la imagen

        // Cambia el fondo con un efecto de desvanecimiento
        $('.hero-section').fadeOut(500, function () {
            $(this).css('background-image', `url(${imgSrc})`).fadeIn(500);
        });

        // Incrementa el índice para la siguiente imagen
        index = (index + 1) % images.length;
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
});