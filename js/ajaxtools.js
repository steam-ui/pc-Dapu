
//功能：ajax封装
//参数：
//  请求方式
//  请求地址
//  请求参数（前端发给后端的）
//  是否异步 
//  返回数据？？？（后端传给前端的）

//返回值：

function ajax1809(method,url,param,isAsync,func) {
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//2、设置请求参数
	/*
	if(method.toLowerCase()=="get"){
		xhr.open(method,url+"?"+param,isAsync);
	}else{
		xhr.open(method,url,isAsync);
	}
	*/
	let urlAndParam = url;
	if(method.toLowerCase()=="get"){
		urlAndParam+="?"+param;
	}
	xhr.open(method,urlAndParam,isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			func(xhr.responseText);
			// return xhr.responseText; 这样写不行
		}
	}

	//4、发送请求
	if(method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(param);
	}else{
		xhr.send();	
	}		
	//return xhr.responseText;//这样也不行
}





//只针对get
function ajax1809byget(url,param,isAsync,func) {
	//ajax1809("get",url,param,isAsync,func);
//1、创建对象
	let xhr = new XMLHttpRequest();

	//2、设置请求参数
	xhr.open("get",url+"?"+param,isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			func(xhr.responseText);
		}
	}
	//4、发送请求
	xhr.send();	
}





//只针对post
function ajax1809bypost(url,param,isAsync,func) {
	ajax1809("post",url,param,isAsync,func);
}





/*
ajax1809byJSON({
	"url":"",
	"method":"get",
	"param":"",
	"func":function(str){

	}
});
*/
function ajax1809byJSON(obj) {
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//2、设置请求参数
	let urlAndParam = obj.url;
	if(obj.method.toLowerCase()=="get"){
		urlAndParam+="?"+obj.param;
	}
	xhr.open(obj.method,urlAndParam,obj.isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			obj.func(xhr.responseText);
		}
	}

	//4、发送请求
	if(obj.method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(obj.param);
	}else{
		xhr.send();	
	}		
}





// ajax1809byJSONandDefault({
// 	"url":"news.php",
// 	"param":"pageindex=1",
// 	"func":function(str){
// 	}
// });

function ajax1809byJSONandDefault(obj) {
	let defaultObj = {
		"url":"#",
		"method":"get",
		"param":"",
		"isAsync":true,
		"func":null
	};
	for(let key in obj){
		defaultObj[key] = obj[key];
	}

	//1、创建对象
	let xhr = new XMLHttpRequest();

	//2、设置请求参数
	let urlAndParam = defaultObj.url;
	if(defaultObj.method.toLowerCase()=="get"){
		urlAndParam+="?"+defaultObj.param;
	}
	xhr.open(defaultObj.method,urlAndParam,defaultObj.isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			defaultObj.func(xhr.responseText);
		}
	}

	//4、发送请求
	if(defaultObj.method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(defaultObj.param);
	}else{
		xhr.send();	
	}		
}