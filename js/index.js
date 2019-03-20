function showlist(){

    var liDom = $(".navA");
    var divDom = $(".navB");
    for (var i = 0; i < liDom.length; i++) {
        liDom[i].index = i;
        liDom[i].onmouseover = function () {
            for (var j = 0; j < divDom.length; j++) {
                divDom[j].style.display = "none";
            }
            divDom[this.index].style.display = "block";
        }
    }

    $(".nav")[0].onmouseout = function () {
        for (var j = 0; j < divDom.length; j++) {
            divDom[j].style.display = "none";
        }
    }

}


function home(){
    document.body.scrollTop=document.documentElement.scrollTop = 0;
}





