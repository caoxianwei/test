
//点击支付类型按钮的方法
function clickButton(button,payType){
	$("button").removeClass("buttoncls");
	$(button).addClass("buttoncls");
	if("1"==payType){
		//仁信
		$("#payConfig_renxin").css("display","block");
		$("#payConfig_shanfu").css("display","none");
		$("#payConfig_AMX").css("display","none");
	}else if("2"==payType){
		//闪付
		$("#payConfig_renxin").css("display","none");
		$("#payConfig_shanfu").css("display","block");
		$("#payConfig_AMX").css("display","none");
	}else if("3"==payType){
		//艾米森
		$("#payConfig_renxin").css("display","none");
		$("#payConfig_shanfu").css("display","none");
		$("#payConfig_AMX").css("display","block");
	}
}

//保存默认支付方式
function saveDefPay(){
 	var payType = $("input[name='payType']:checked").val();
	 $.post($.getContextPath() + "payConfig/saveDefPay.do",{defPay:payType},function(data){
		 if(data == "SUCCESS"){
			 showMsg("系统提示","保存成功","info");
		 }else if(data == "FAIL"){
			 showMsg("系统提示","保存失败","error");
		 }else if(data == "EMPTY"){
			 showMsg("系统提示","设置失败，未查询到支付收款公司","error");
		 }else if(data == "VALIDATE_FAIL"){
				showMsg("系统提示","提交的内容包含非法字符，请检查","error");
		 }else if(data == "NOTEXIST"){
				showMsg("系统提示","无操作权限","error");
		 }else{
			 showMsg("系统提示","系统异常，请联系系统管理员","error");
		 }
	 },'text');
}

//保存仁信支付的方法
function saveRenxinPaySet(){
	var payUrl = $("#rx_payurl").val();
	if(!validateUrl(payUrl)){
		showMsg("系统提示","请输入正确的支付链接地址","warning");
		return;
	}
	var callback_url = $("#rx_callback_url").val();
	if(!validateUrl(callback_url)){
		showMsg("系统提示","请输入正确的支付回调地址","warning");
		return;
	}
	var parames = $("#renxin_form").serialize();
	savePaySet("renxin_form",parames);
}

//保存闪付支付的方法
function saveShanFUPaySet(){
	var payUrl = $("#sf_payurl").val();
	if(!validateUrl(payUrl)){
		showMsg("系统提示","请输入正确的支付链接地址","warning");
		return;
	}
	var callback_url = $("#sf_callback_url").val();
	if(!validateUrl(callback_url)){
		showMsg("系统提示","请输入正确的支付回调地址","warning");
		return;
	}
	var parames = $("#shanfu_form").serialize()
	savePaySet("shanfu_form",parames);
}

//保存艾米森支付的方法
function saveAmxPaySet(){
	var payUrl = $("#amx_payurl").val();
	if(!validateUrl(payUrl)){
		showMsg("系统提示","请输入正确的支付链接地址","warning");
		return;
	}
	var callback_url = $("#amx_callback_url").val();
	if(!validateUrl(callback_url)){
		showMsg("系统提示","请输入正确的支付回调地址","warning");
		return;
	}
	var parames = $("#amx_form").serialize()
	savePaySet("amx_form",parames);
}

//保存支付信息
function savePaySet(formId,parames){
	if(parames == null || parames.length == 0){
		showMsg("系统提示","请输入保存的内容","warning");
		return ;
	}
	saveForm({
		   formId:formId,
		   url:$.getContextPath() + 'payConfig/savePaySet.do',
		   queryParams:parames,
		   callback:function(data){
			   if(data == "SUCCESS"){
				   $.messager.alert("系统提示","保存成功","info");
			   }else if(data == "FAIL"){
				   showMsg("系统提示","保存失败","error");
			   }else if(data == "EMPTY"){
					 showMsg("系统提示","提交的内容为空，请检查","error");
			   }else if(data == "VALIDATE_FAIL"){
						showMsg("系统提示","请输入正确的内容","error");
			   }else if(data == "NOTEXIST"){
						showMsg("系统提示","无操作权限","error");
			   }else{
				   showMsg("系统提示","系统异常，请联系系统管理员","error");
			   }
		   }
	   });
}

