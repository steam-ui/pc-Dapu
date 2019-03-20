$(function(){
    $("#phoneEntry").click(function(){
        $("#contentUser").css({"display":"none"});
        $("#contentPhone").css({"display":"block"});
    })
})


$(function () {
    $("#userEntry").click(function () {
        $("#contentPhone").css({ "display": "none" });
        $("#contentUser").css({ "display": "block" });
    })
})


$("#btnId").click(function () {
    ajax1809("post", "php/login.php", "username=" + $(".contentRightG").val() + "&userpass=" + $(".contentRightE").val(), true, show)
})

function show(str) {
    if (str == "1") {
        addCookie("username", $(".contentRightG").val(),60)
        window.location = "index.html"
    }
}

