 //点击复选框的方法
   function clickBox(input){
	   $("input[name='betStatus']").not($(input)).attr("checked",false);
   }
//关闭窗口
function closeWin(){
	parent.$('#newWin').window('close'); 
}
//保存数据
function saveData(){
	var user_name = $("#user_name").val();
	if($.isEmpty(user_name)){
		showMsg("系统提示","请输入用户名","warning");
		return;
	}
	var user_email = $("#user_email").val();
	if(!$.isEmpty(user_email) && !$.isEmail(user_email)){
		showMsg("系统提示","邮箱格式错误，请修改","warning");
		return;
	}
	var cell_phone = $("#cell_phone").val();
	if(!$.isEmpty(cell_phone) && !$.isMobilePhone(cell_phone)){
		showMsg("系统提示","手机号码错误，请修改","warning");
		return;
	}
	saveForm({
		formId:'ff',
		url:'users/updateUserInfo.do',
		queryParams:$("ff").serialize(),
		callback:function(data){
			if(data == "SUCCESS"){
				$.messager.alert("系统提示","保存成功","info",function(){
					window.parent.closeWin();//关闭窗口
				});
			}else if(data == "FAIL"){
				showMsg("系统提示","保存失败","warning");
			}else if(data == "NOTEXIST"){
				showMsg("系统提示","无操作权限","warning");
			}else if(data == "EMPTY"){
				showMsg("系统提示","未查询到用户","warning");
			}else if(data == "EMAIL_ERROR"){
				showMsg("系统提示","邮箱格式错误，请修改","warning");
			}else if(data == "MOBILE_ERROR"){
				showMsg("系统提示","手机号码错误，请修改","warning");
			}else{
				showMsg("系统提示","系统异常，请联系系统管理员","error");
			}
		}
	});
}

