// input animation .
var current = "";
$("input").on("mouseenter", function () {
  current = $(this).attr("placeholder");
  $(this).removeAttr("placeholder");
});
$("input").on("mouseleave", function () {
  if ($(this).attr("name") === "username") {
    $(this).attr("placeholder", "Username");
  } else {
    $(this).attr("placeholder", current);
  }
});

$(".card").on("mouseenter", function () {
  $(".nav-bar").slideUp();
});

$(".card").on("mouseleave", function () {
  $(".nav-bar").slideDown();
});

$("button[name='sign']").attr("id", function () {
  if (
    window.location.href == "http://localhost:3000/sign" ||
    window.location.href == "http://localhost:3000/acount-sign"
  ) {
    return "active";
  } else {
    return "";
  }
});

$("button[name='log']").attr("id", function () {
  if (
    window.location.href == "http://localhost:3000/" ||
    window.location.href == "http://localhost:3000/acount-log"
  ) {
    return "active";
  } else {
    return "";
  }
});
