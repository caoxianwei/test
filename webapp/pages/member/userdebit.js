//关闭窗口
function closeWin(){
	parent.$('#newWin').window('close'); 
	
}
var isCommitted = false;//表单是否已经提交标识，默认为false
//保存数据
function saveData(){
	if(isCommitted){
		showMsg("系统提示","该账号已经扣款","error");
		return;
	}
	var add_money = $("#add_money").val();
	if($.isEmpty(add_money)){
		showMsg("系统提示","请输入扣款金额","error");
		return;
	}
	if(!$.checkNegative(add_money.trim())){
		showMsg("系统提示","数据输入错误,请输入正数","error");
		return;
	}
	var money = $("#money").val().trim();
	if(money*1.0<add_money*1.0){
		showMsg("系统提示","余额不足","error");
		$("#add_money").focus();
		return;
	}
	confirm("系统提示","确认扣款?",function(){
		isCommitted = true;
		saveForm({
			   formId:'ff',
			   url:'users/saveDebit.do',
			   queryParams:$("ff").serialize(),
			   callback:function(data){
				   if(data == "SUCCESS"){
					   $.messager.alert("系统提示","扣款成功","info",function(){
						   window.parent.closeWin();//关闭窗口
					   });
				   }else{
					   isCommitted = false;
					   showMsg("系统提示",data,"error");
				   }
			   }
		   });
	})
}




