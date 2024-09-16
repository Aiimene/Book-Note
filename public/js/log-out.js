$(document).ready( function(){
    $("#down").on("mouseenter" , function(){
        $(".log-out").slideDown();

    })
    $("#down").on("mouseleave" , function(){
        $(".log-out").slideUp();
    })
});