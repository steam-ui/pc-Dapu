function t(str) {//#box .cls  p
    if (str.charAt(0) == "#") {
        return document.getElementById(str.substring(1));
    } else if (str.charAt(0) == ".") {
        return document.getElementsByClassName(str.substring(1));
    } else {
        return document.getElementsByTagName(str);
    }
}	

//放大镜
let lis = t("#imgList").children;
//	遍历li
for (let i = 0; i < lis.length; i++) {
    //添加点击事件
    lis[i].onclick = function () {
        //	获取当前图片的src
        let bgImg = getStyle(this, "backgroundImage");
        console.log(bgImg);
        t("#bigBox").style.backgroundImage = bgImg;
        t("#showBox").style.backgroundImage = bgImg;
    }
}

t("#bigBox").onmouseover = function () {
    t("#mirrorBox").style.display = 'block';
    t("#showBox").style.display = 'block';
}

t("#bigBox").onmouseout = function () {
    t("#mirrorBox").style.display = 'none';
    t("#showBox").style.display = 'none';
}

t("#bigBox").onmousemove = function (event) {
    let ev = event || window.event;
    scale(ev);
}

function scale(ev) {
    //		1-获取数据
    let x = ev.pageX - t("#bigBox").offsetLeft - t("#mirrorBox").offsetWidth / 2;
    let y = ev.pageY - t("#bigBox").offsetTop - t("#mirrorBox").offsetHeight / 2;
    //		2-边界的判断处理
    if (x < 0) {
        x = 0;
    } else if (x > t("#bigBox").offsetWidth - t("#mirrorBox").offsetWidth) {
        x = t("#bigBox").offsetWidth - t("#mirrorBox").offsetWidth;
    }
    if (y < 0) {
        y = 0;
    } else if (y > t("#bigBox").offsetHeight - t("#mirrorBox").offsetHeight) {
        y = t("#bigBox").offsetHeight - t("#mirrorBox").offsetHeight;
    }
    //		3-外观改变
    t("#mirrorBox").style.left = x + 'px';
    t("#mirrorBox").style.top = y + 'px';
    //		算出遮罩层左侧距离和小图之间的比例
    let scalX = x / (t("#bigBox").offsetWidth - t("#mirrorBox").offsetWidth);
    let scalY = y / (t("#bigBox").offsetHeight - t("#mirrorBox").offsetHeight);
    //		$("#showBox").style.backgroundPositionX = -scalX*(1500-$("#showBox").offsetWidth) + 'px';
    //		$("#showBox").style.backgroundPositionY = -scalY*(1200-$("#showBox").offsetHeight) + 'px';
    t("#showBox").style.backgroundPosition = (-1 * 2 * x) + 'px ' + (-1 * 2 * y) + 'px';
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, false)[attr];
    }
}


//点击颜色框
var spanDom = t(".articleColor")[0].children;
for(var i=0;i<spanDom.length;i++){
    spanDom[i].index=i;
    spanDom[i].onclick=function(){
        for (var i = 0; i < spanDom.length; i++){
            spanDom[i].style.border = "0";
            spanDom[i].style.background="#ddd";
        }
        spanDom[this.index].style.border ="2px solid #b1544f"
        spanDom[this.index].style.background = "url('img/xuan.png') no-repeat 29px 9px"
    }
}

var spans = t(".articleSize")[0].children;
for (var i = 0; i < spanDom.length; i++) {
    spans[i].index = i;
    spans[i].onclick = function () {
        for (var i = 0; i < spans.length; i++) {
            spans[i].style.border = "0";
            spans[i].style.background = "#ddd";
        }
        spans[this.index].style.border = "2px solid #b1544f"
        spans[this.index].style.background = "url('img/xuan.png') no-repeat 45px 9px"
    }
}



//将数据库里的商品内容展示到商品详情页上
$(function () {
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    //接收URL中的参数goodsId
    var goodsId = getUrlParam('goodsId');
    // alert(goodsId);
    $.ajax({
        type: "get",
        url: "php/getGoodsInfo.php",
        async: true,
        dataType: "json",
        data: {
            goodsId: goodsId,
        },
        success: function (data) {
            //console.log(data);
            if (goodsId == data.goodsId) {
                $(".articleName").html(data.goodsName);
                $("#goodsId").html(data.goodsId);
                $("#goodsPrice").html(data.goodsPrice);
                $(".articleFont").html(data.goodsDesc);
                $("#goodscolor").html(data.beiyong3);
                $("#goodssize").html(data.beiyong4);
                $(".bigBox").css({ "background-Image": `url('${data.goodsImg}')`});
            }
        }
    })
})



//点击加减图片,数字发生变化
var count=0;
t("#jian").onclick=function(){
    if(count==0){
        return;
    }
    count--;
    t(".articleShuling")[0].innerHTML=count;
}

t("#jia").onclick=function () {
    count++;
    t(".articleShuling")[0].innerHTML = count;
}




//点击添加购物车按钮，购物车添加数据
$(".goodsCar").click(function(){
    let goodsId = $("#goodsId").html();
    let goodsName = $(".articleName").html();
    let goodsPrice = $("#goodsPrice").html();
    let goodsColor = $("#goodscolor").html();
    let goodsSize = $("#goodssize").html(); 
    let goodsCount = $(".articleShuling").html();  
    console.log(goodsId);
    console.log(goodsName);
    console.log(goodsPrice);
    console.log(goodsColor);
    console.log(goodsSize);
    console.log(goodsCount);
    $.ajax({
        type: "post",
        url: "php/addShoppingCart.php",
        async: true,
        dataType: "json",
        data: {
            goodsId: goodsId,
            goodsName: goodsName,
            goodsPrice: goodsPrice,
            goodsColor:goodsColor,
            goodsSize:goodsSize,
            goodsCount: goodsCount
        },

        success: function (data) {
            console.log(data);
            if (data=="1") {
                alert("添加成功")
            } else if (data == "0"){
                alert("添加失败")
            }
        }
    })
})
