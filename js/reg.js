
//手机号码正则验证
$(".contentRightG").focus(function(){
    $(".contentRightF").html("请输入正确的手机号码,仅支持中国大陆手机");
    $(".contentRightF").css({"color":"red","marginLeft":"10px"})
});		



//随机验证码和正则
$(function(){
    $(".contentRightA").click(function(){
        sj();
        getColor();
    });
});



//随机验证码
function sj(){
    var str="1234567890qwertyuioplkjhgfdsazxcvbnm";
    var str1 = "";
    for (var i = 1; i <= 4; i++) {
        str1 += parseInt(Math.random() * 10);
        $(".contentRightB").html(str1);
    }
}


//随机十六进制颜色
function getColor() {
    var str = "#";
    for (var i = 0; i < 6; i++) {
        str += (parseInt(Math.random() * 16)).toString(16);
        
    }
    $(".contentRightB").css({"background":str});
}


//密码强度判断
var spanObj = $(".contentRightD span");
$(".contentRightE").keyup(function () {
    let num = 0;
    let txt = $(".contentRightE").val();
    if ((/[a-zA-Z]+/gi).test(txt)) {
        num += 1;
    }
    if ((/[\d]+/gi).test(txt)) {
        num += 1;
    }
    if ((/[^A-Za-z\d]+/gi).test(txt)) {
        num += 1;
    }
    spanObj.each(function (i) {
        if (i == num - 1) {
            $(this).addClass("act");
        } else {
            $(this).removeClass("act");
        }
    })
});


//判断密码是否一致
    $("#repassUser").blur(function(){
        let pas = $(".contentRightE").val();
        let repas = $("#repassUser").val();
        if (pas != repas) {
            $("#reInfo").html("两次密码不一致，请从新输入");
            $("#reInfo").css({ "color": "red","marginLeft":"4px" })
        }
    })   


//当输入手机号码第一次发送请求
$(".contentRightG").blur(function () {
    let s = $("#phone").val();
    ajax1809("get", "php/regS.php", "username=" + s, true, func)
})

function func(str) {
    if (str == "1") {
        $(".contentRightResult").html("该手机号码已被注册")
        $(".contentRightResult").css({ "color": "red" })
    } else if (str == "0") {
        $(".contentRightResult").html("该手机号码可以注册")
        $(".contentRightResult").css({ "color": "green" })
    }
}


//当点击注册按钮时第二次发送请求
$("#btn").click(function () {
    ajax1809("post", "php/regSave.php", "username=" + $("#phone").val() + "&userpass=" + $(".contentRightE").val(), true, show)
})

function show(str) {
    if (str == "1") {
        window.location = "entry.html"
    } else if (str == "0") {
        alert("注册失败，请从新注册")
        window.location = "reg.html"
    }
}
