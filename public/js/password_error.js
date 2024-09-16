$(document).on("DOMContentLoaded" , function(){
    var element = $("#pass_error");
    if(element.length>0){
        $('input[name="password"]').addClass("vibrate");
        setTimeout(function(){
            element.remove();
            $('input[name="password"]').removeClass("vibrate");
        } , 1000);
    }
});