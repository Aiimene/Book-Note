$(document).ready(function() {
    $('.rating').each(function() {
        setRating(this);
    });
});

function setRating(element) {
    let star = parseInt($(element).attr("data-rating"));
    for (let i = 0; i <= star; i++) {
        $(element).children(".star-" + i).attr("src", "/images/star-fill.svg");
    }
}