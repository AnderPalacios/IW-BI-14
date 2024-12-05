$(document).ready(function () {
    // Aplico lo mismo para cada párrafo que cargamos
    $(".texto-caer").each(function (index) {
        $(this).css({
            position: "relative",
            top: "-200px", // Distancia a la que empieza
            opacity: 0     // Invisible
        }).delay(index * 200).animate( { top: "0",  opacity: 1 }, 2000, "swing" ); // Que dire 2s
    });
});