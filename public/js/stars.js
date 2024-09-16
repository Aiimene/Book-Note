$(document).on("DOMContentLoaded" , function(){
    let star = parseInt($(".rating").attr("name"));
    for(let i = 1 ; i<=star ; i++){
        $(".star-"+i).attr("src" , "/images/star-fill.svg");
    }
});