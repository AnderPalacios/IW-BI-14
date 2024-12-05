$(document).ready(function () {
    // Mismo efecto que para las razas. Como hay menos categorías de peligro el efcto va a durar 1s
    $(".categorias_caer").each(function (index) {
        $(this).css({
            position: "relative",
            top: "-200px", 
            opacity: 0   
        }).delay(index * 200) 
          .animate(
            {
                top: "0",  // Vuelve a la posición inicial 
                opacity: 1  
            },
            1000,     
            "swing"  
        );
    });
});