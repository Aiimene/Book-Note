$(document).on("DOMContentLoaded" , function(){
    var element = $("#error");
    if(element.length>0){
        $('input[name="username"]').addClass("vibrate");
        setTimeout(function(){
            element.remove();
            $('input[name="username"]').removeClass("vibrate");
        } , 1000);
    }
});