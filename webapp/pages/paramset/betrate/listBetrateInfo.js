
//保存赔率
function saveBetRate(id){
	var game_type = $("#game_type_" + id).val();
	var play_type = $("#play_type_" + id).val();
	var betrate = $("#bet_rate_" + id).val();
	var status = $("#status_"+id).val();
	if(checkBetoption(betrate)){
		$("#bet_rate_" + id).textbox('clear');
		parent.showMsg("系统提示","请输入正确的赔率","warning");
		return;
	}
	var parames = "option_id=" + id;
	parames += "&bet_rate=" + betrate;
	parames += "&status=" + status;
	 //传递此参数是因为要修改内存变量中的赔率
	parames += "&game_type=" + game_type;
	parames += "&play_type=" + play_type;
	$.post($.getContextPath() + "gaBetOption/updatebetRate.do",parames,function(data){
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

//批量保存
function batchSaveData(){
	var b = false;
	var updateDate = new Array();
	var game_type = "";
	var pay_type = "";
	$("input[name='option_id']").each(function(){
		var id = $(this).val();
		var bet_rate = $("#bet_rate_" + id).val();
		game_type = $("#game_type_" + id).val();
		play_type = $("#play_type_" + id).val();
		var status = $("#status_" + id).val();
		if(checkBetoption(bet_rate)){
			//校验赔率是否正确
			b = true;
			return;
		}
		//id  赔率 + 状态
		updateDate.push(id+ "_" + bet_rate + "_" + status);
	});
	if(b){
		parent.showMsg("系统提示","请输入正确的赔率","warning");
		return;
	}
	if(updateDate.length == 0){
		parent.showMsg("系统提示","请输入有效的赔率","warning");
		return;
	}
	 var parames = "updateBetData=" + updateDate.join(";");
	 //传递此参数是因为要修改内存变量中的赔率
	 parames += "&game_type=" + game_type;
	 parames += "&play_type=" + play_type;
	$.post($.getContextPath()+"gaBetOption/betchUpdatebetRate.do",parames,function(data){
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


//校验赔率
//返回true 赔率错误    返回false  赔率正确
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
				showMsg("系统提示","请输入正确的赔率","warning");
				$(input).textbox('clear');
			}
		}
	 }else{
		if(!checkNum(betRate)){
			showMsg("系统提示","请输入正确的赔率","warning");
			$(input).textbox('clear');
		}
	 }
}