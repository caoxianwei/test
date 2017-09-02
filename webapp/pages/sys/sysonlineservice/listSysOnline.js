
//保存通知数据
function addData(){
	var address = $("#address").val();
	if($.isEmpty(address)){
		showMsg("系统提示","请输入客服地址","error");
		return;
	}
	if(!validateUrl(address)){
		showMsg("系统提示","请输入正确的客服地址","error");
		return;
	}
	var parames = "address=" + $.strEncode(address);
	parames += "&id=" + $("#id").val();
	$.post($.getContextPath() + "sysOnlineService/addData.do",parames,function(data){
		if(data == "SUCCESS"){
			   showMsg("系统提示","保存成功","info");
		   }else if(data == "FAIL"){
			   showMsg("系统提示","保存失败","warning");
		   }else if(data == "EMPTY"){
			   showMsg("系统提示","提交的内容为空，请检查","warning");
		   }else if(data == "VALIDATE_FAIL"){
			   showMsg("系统提示","提交的内容包含非法字符，请检查","warning");
		   }else if(data == "NOTEXIST"){
			   showMsg("系统提示","无操作权限","warning");
		   }else{
			   showMsg("系统提示","系统异常，请联系系统管理员","error");
		   }
	},"text");
}
