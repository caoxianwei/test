
//保存返点
function saveRebate(id){
	var game_type = $("#game_type_" + id).val();
	var rebate = $("#rebate_" + id).val();
	if(!$.isEmpty(rebate) && checkBetoption(rebate)){
		$("#rebate_" + id).textbox('clear');
		parent.showMsg("系统提示","请输入正确的返点","warning");
		return;
	}
	var parames = "option_id=" + id;
	parames += "&rebate=" + rebate;
	//传递此参数是因为要修改内存变量中的返点
	parames += "&game_type=" + game_type;
	$.post($.getContextPath() + "gaBetOption/updaterebate.do",parames,function(data){
		if(data == "SUCCESS"){
			parent.showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			parent.showMsg("系统提示","保存失败","warning");
		}else if(data == "NOTEXIST"){
			parent.showMsg("系统提示","无操作权限","warning");
		}else{
			parent.showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
	},"text");
	
	
}

//批量保存返点
function batchSaveData(){
	var b = false;
	var updateDate = new Array();
	var game_type = "";
	$("input[name='option_id']").each(function(){
		var id = $(this).val();
		var rebate = $("#rebate_"+id).val();
		game_type = $("#game_type_"+id).val();
		if(!$.isEmpty(rebate) && !checkNum(rebate)){
			//校验返点
			b = true;
			return;
		}
		//id  返点
		updateDate.push(id+ "_" + rebate);
	});
	if(b){
		parent.showMsg("系统提示","请输入正确的返点","info");
		return;
	}
	if(updateDate.length == 0){
		parent.showMsg("系统提示","请输入有效的返点值","info");
		return;
	}
	 var parames = "updateRebateData=" + updateDate.join(";");
	//传递此参数是因为要修改内存变量中的返点
	 parames += "&game_type=" + game_type;
	$.post($.getContextPath() + "gaBetOption/betchUpdateRebate.do",parames,function(data){
		if(data == "SUCCESS"){
			parent.showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			parent.showMsg("系统提示","保存失败","warning");
		}else if(data == "NOTEXIST"){
			parent.showMsg("系统提示","无操作权限","warning");
		}else{
			parent.showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
	},"text");
}

//校验返点
//返回true 返点错误    返回false  返点正确
function checkBetoption(betRate){
	var b = false;
	betRate = betRate + "";
	if(betRate == null){
	}else if(betRate.indexOf("/") > -1){
		var vals = betRate.split("/");
		for(var i=0;i<vals.length;i++){
			if(!checkNum(vals[i])){
				b = true;
				break;
			}
		}
	}else{
		if(!checkNum(betRate)){
			b = true;
		}
	}
	return b;
}

//input 键盘输入事件
function checkInputBetoption(input){
	 var val = $(input).val();
	 if(betRate == null){
	 }else if(betRate.indexOf("/") > -1){
		var vals = betRate.split("/");
		for(var i=0;i<vals.length;i++){
			if(!$.isEmpty(vals[i]) && !checkNum(vals[i])){
				showMsg("系统提示","请输入正确的返点","warning");
				$(input).textbox('clear');
			}
		}
	 }else{
		if(!checkNum(betRate)){
			showMsg("系统提示","请输入正确的返点","warning");
			$(input).textbox('clear');
		}
	 }
}