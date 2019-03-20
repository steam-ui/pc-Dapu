
//获取商品列表并显示
$(function() {
    $.ajax({
        "type": "post",
        "url": "php/getGoodsList.php",
        "async": true,
        "data": {},
        "success": function (data) {
            let length = data.length;
            for (var i = 0; i < length; i++) {
                let str = `<div class="allGoodsRightlistA">
                    <a href='descript.html?goodsId=${data[i].goodsId}'><img src="img/${data[i].goodsImg}"></a>
                        <div class="allGoodsRightlistB">
                            <img src="img/${data[i].goodsImg}">
                                <p>￥${data[i].goodsPrice}</p>
                                <p>${data[i].goodsName}</p>
                    </div>
                </div>`
                $(".allGoodsRightlist").append(str);
            }
        },
        "dataType": "json"
    })
})







