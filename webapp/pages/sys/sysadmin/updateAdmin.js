$("#tijiao").click(function(){
	var real_name = $("#real_name").val();
	if($.isEmpty(real_name)){
		$.messager.alert("操作提示","请输入真实姓名！","error");
		return false;
	}
	var login_name = $("#login_name").val();
	if($.isEmpty(login_name)){
		$.messager.alert("操作提示","请输入登录账号！","error");
		return false;
	}
	var check = $("input[name='roles']").is(':checked');
	if(!check){
		$.messager.alert("操作提示","请选择角色！","error");
		return false;
	}
	var obj=document.getElementsByName('roles'); //选择所有name="'test'"的对象，返回数组 
	//取到对象数组后，我们来循环检测它是不是被选中 
	var s=''; 
	for(var i=0; i<obj.length; i++){ 
	if(obj[i].checked){
		s+=obj[i].value+','; //如果选中，将value添加到变量s中 
		} 
	}
	if($.isEmpty(s)){
		$.messager.alert("操作提示","请选择角色！","error");
		return;
	}
	saveForm({formId:"saveForm",url:"sysadmin/updateAdmin.do",
	callback:function(json){
		if("SUCCESS"==json.trim()){
			$.messager.alert("系统提示","操作成功！","info",function(){
				parent.loadNewPage();
			});
			
		}else if("EXIST"==json.trim()){
			$.messager.alert("系统提示","该用户名已经存在！","error");
		}else{
			$.messager.alert("系统提示","保存失败！","error");
		}
	}})
	
});
function cancel(){
	parent.$('#addWin').window('close'); 
}
