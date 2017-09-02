//关闭窗口
function closeWin(){
	parent.$('#newWin').window('close'); 
}
//保存数据
function addData(){
	var category_name = $("#category_name").val();
	if($.isEmpty(category_name)){
		showMsg("系统提示","请输入分类名称","warning");
		return;
	}
	if($.getStrLength(category_name)>512){
		showMsg("系统提示","分类名称过长,最多输入256个汉字","warning");
		return;
	}
   saveForm({
	   formId:'ff',
	   url:$.getContextPath() + 'newsCategory/addData.do',
	   queryParams:$("ff").serialize(),
	   callback:function(data){
		   if(data == "SUCCESS"){
			   $.messager.alert("系统提示","保存成功","info",function(){
				   closeDiv();
			   });
		   }else if(data == "FAIL"){
			   showMsg("系统提示","保存失败","warning");
		   }else if(data == "EMPTY"){
				 showMsg("系统提示","提交的内容为空，请检查","warning");
		   }else if(data == "VALIDATE_FAIL"){
					showMsg("系统提示","提交的内容包含非法字符，请检查","warning");
		   }else if(data == "NOTEXIST"){
					showMsg("系统提示","无操作权限","warning");
		   }else if(data == "EXIST"){
			   showMsg("系统提示","分类名称已存在","warning");
		   }else{
			   showMsg("系统提示","系统异常，请联系系统管理员","error");
		   }
	   }
   });
}

//关闭窗口(在新增与修改页面使用)
function closeDiv(){
	window.parent.closeWin();//关闭窗口
}
