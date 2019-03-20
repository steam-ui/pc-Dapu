//打开购物车页面时购物车显示
$(function(){
    $.ajax({
        "type": "post",
        "url": "php/getShoppingCart.php",
        "async": true,
        "data": {},
        "success": function (data) {
            let lengths = data.length;
            for (var i = 0; i < lengths; i++) {
                let str = `<tr>
                    <td><input type="checkbox"></td>
                        <td class="goodsContent">
                            <div class="goodsLeft">
                                <img src="img/15087477559.png">
                            </div>
                            <div class="goodsRight">
                                <p class="goodsName">${data[i].goodsName}</p>
                                <p>颜色：<span class="goodsColor">${data[i].goodsColor}</span>尺寸：<span class="goodsSize">${data[i].goodsSize}</span></p>
                            </div>  
                    </td>
                    <td>￥<span>${data[i].goodsPrice}</span></td>
                    <td>
                        <span class="countLeft">-</span>
                        <span class="countCenter">${data[i].goodsCount}</span>
                        <span class="countRight">+</span>
                    </td>
                    <td>￥<span>${data[i].goodsPrice}</span></td>
                    <td><span class="removeGoods">删除</span></td>
            </tr>`
                $("table").append(str);
                //
                $(function () {
                    //点击添加按钮数量增加，价格变化
                    var addBtns = t(".countRight");
                    for (var i = 0; i < addBtns.length; i++) {
                        addBtns[i].onclick = function () {
                            //1、改数量
                            var count = parseInt(this.previousElementSibling.innerHTML);
                            count++;
                            this.previousElementSibling.innerHTML = count;
                            //2、改金额
                            //1)、单价
                            var price = parseFloat(this.parentNode.previousElementSibling.lastElementChild.innerHTML);
                            var money = price * count;
                            this.parentNode.nextElementSibling.firstElementChild.innerHTML = money;
                            //3、改总价
                            var oTr = t("tr");
                                let sum = 0;
                                let n = 0;
                                for (let j = 1; j < oTr.length; j++) {
                                    sum += parseFloat(oTr[j].children[4].lastElementChild.innerHTML);
                                    n += parseInt(oTr[j].children[3].children[1].innerHTML);
                                }
                                t("#totalmoney").innerHTML = sum;
                                t("#totalcount").innerHTML = n;
                            
                            
                        }
                     }


                     //点击减少按钮，数量减少，价格变化
                    var reduceBtns = t(".countLeft");
                        for (var i = 0; i < reduceBtns.length; i++) {
                            reduceBtns[i].onclick = function () {
                                //1、改数量
                                var count = parseInt(this.nextElementSibling.innerHTML);
                                count--;
                                if (count < 0) {
                                    return;
                                }
                                this.nextElementSibling.innerHTML = count;
                                //2、改金额
                                //1)、单价
                                var price = parseFloat(this.parentNode.previousElementSibling.lastElementChild.innerHTML);
                                var money = price * count;
                                this.parentNode.nextElementSibling.firstElementChild.innerHTML = money;
                                //3、改总价
                                var oTr = t("tr");
                                    let sum = 0;
                                    let n = 0;
                                    for (let j = 1; j < oTr.length; j++) {
                                        sum += parseFloat(oTr[j].children[4].lastElementChild.innerHTML);
                                        n += parseInt(oTr[j].children[3].children[1].innerHTML);
                                    }
                                    t("#totalmoney").innerHTML = sum;
                                    t("#totalcount").innerHTML = n;
                                                             
                            }
                    }

                })

            }
        } ,
        "dataType": "json"
    })
})




$("table").on("click", ".removeGoods", function () {
    if (confirm("确定要删除该商品吗？")) {
        $(this).parent().parent().remove();
        totalMoney();
    }
})




function t(str) {//#box .cls  p
    if (str.charAt(0) == "#") {
        return document.getElementById(str.substring(1));
    } else if (str.charAt(0) == ".") {
        return document.getElementsByClassName(str.substring(1));
    } else {
        return document.getElementsByTagName(str);
    }
}	
