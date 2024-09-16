$('input[name="confirm"]').on('input', function() {
    var password = $('input[name="password"]').val();
    for(let i = 0 ; i<$(this).val().length ; i++){
        if(password[i]!== $(this).val()[i]){
            error();
        }
    }
});
function error (){
    $('input[name="confirm"]').css("color" , "red");
    $('input[name="confirm"]').addClass("vibrate");
    setTimeout(() => {
        $('input[name="confirm"]').removeClass("vibrate");
        $('input[name="confirm"]').val("");
        $('input[name="confirm"]').css("color" , "");
    }, 1000);
}
