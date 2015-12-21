// Get the Data from our Database


$.ajax({   
    url: "/api/flyers", 
    success: function( data ) {
        // for everything inside data (every elemetn)

        // for every flyer, add them to the page
        for (var i=0;i<data.flyers.length;i++) {
            createFlyer(data.flyers[i]);

        }
    }
});

function createFlyer(flyer) {
        $("#events-grid-list").append(
            '<li class="flip-container" ontouchstart="this.classList.toggle(\'hover\');"> \
        <div class="flipper"> \
            <div class="front" style="background-image: url(' + flyer.image +');"> \
            </div> \
            <div class="back">' +
                '<h2>' + flyer.name +'</h2>' +
                '<h2>' + flyer.date +'</h2>' +
                '<p>' + flyer.description +'</p>' +
            '</div> \
        </div> \
    </li>');

}


$(document).ready(function() {

$("#create").click(function() {
    $.ajax({  
                type: "POST",  
                url: "create",  
                data: {
                    name: $("#name").val(), 
                    image: $("#image").val(), 
                    date: $("#date").val(), 
                    description: $("#description").val()
                },  
                success: function(flyer) {
                    createFlyer(flyer);
                } 
            }); 
    console.log("hello");
    $.magnificPopup.close();
    return false;
})

    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });
});
