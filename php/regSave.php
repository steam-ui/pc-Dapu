<?php
	header("Content-type:text/html;charset=utf-8");

	//一、获取用户的输入
	$username = $_POST['username'];
	$userpass = $_POST['userpass'];
	//二、处理
	//1、建立连接（搭桥）
	$conn = mysql_connect('localhost','root','root');
	if(!$conn){
		die("连接失败");
	}
	//2、选择数据库（选择目的地）
	mysql_select_db("myself",$conn);

	//3、执行SQL语句（传输数据）
	//3.1 查询
	$sqlstr="select * from reg where userphone='$username'";
	$result = mysql_query($sqlstr,$conn);

	if(mysql_num_rows($result)>0){
		//4、关闭数据库（过河拆桥）
		mysql_close($conn);
		echo "该账号已经被使用";
	}else{
		$sqlstr="insert into reg  values('$username','$userpass')";
		$result = mysql_query($sqlstr,$conn);

		//4、关闭数据库（过河拆桥）
		mysql_close($conn);

		//三、响应
		if($result==1){
			echo "1";	
		}else{
			echo "0";	
		}		
	}
?>