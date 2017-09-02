$("#tijiao").click(function(){
	var real_name = $("#real_name").val();
	if($.isEmpty(real_name)){
		$.messager.alert("操作提示","请输入真实姓名！","error");
		return false;
	}
	
	saveForm({formId:"saveForm",url:"sysadmin/usersave.do",
	callback:function(json){
		if("SUCCESS"==json.trim()){
			$.messager.alert("消息提示","操作成功！","info",function(){
				parent.$('#newwindow').window('close'); 
			});
		}else{
			$.messager.alert("消息提示","保存失败！","error");
		}
	}})
});
function cancel(){
	parent.$('#newwindow').window('close'); 
}

