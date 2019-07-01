;(function($){
    "use strict"
	//* Navbar Fixed  
    function navbarFixed(){
console.log("enterwed thme")
        // if ( $('.header_area').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >=  $('header').height() + 50) {
                   

                    $(".header_area").addClass("navbar_fixed");
                    $('logo_status').addClass("logo_white")
                } else {
                 
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        // };
    };
    navbarFixed();

})(jQuery)