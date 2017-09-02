//六合彩手动开奖
$(function(){
	for(var i=0;i<userBetJson.length;i++){
		var optionids = userBetJson[i].option_ids;
		if(optionids != null && optionids.length > 0){
			var ids = optionids.split(",");
			for(var j=0;j<ids.length;j++){
				$("#option_"+ids[j]).attr("checked",true);
			}
		}
	  }
});

//更新订单
function updateOrder(){
	  var optionTitle = new Array();
	  var betOptionId = new Array();//投注项的id
	  var val = $("input[name='option']:checked").val();
	  var parames = "orderid=" + $("#order_id").val();
	  if(val == null || val.length == 0){
		  showMsg("系统提示","请选择投注项","warning");
		  return ;
	  }
	  if(val.trim() == "-1"){
		  //按原单计算
	  }else{
		  $("input[name='option']:checked").each(function(){
			  //投注id
			  var id = $(this).val();
			  //投注项名称
			  var optName = $("input[name='optionTitleName_"+id+"']").val();
			  betOptionId.push(id);
			  optionTitle.push(optName);
		  });
		  if(optionTitle.length != 0){
			  var playName = $("#play_name").val();
			  if(playName == "过关"){
				  optionTitle = optionTitle.join(";");
			  }else{
				  if(optionTitle.length > 1){
					  optionTitle = optionTitle.join(",");
				  }
			  }
		  }
		  parames += "&optionIds=" + betOptionId.join(",");
		  parames += "&optionTitle=" + optionTitle;
	  }
	  
	  $.post($.getContextPath() + "lotteryOrder/updateAbnormalOrder.do",parames,function(data){
		  if(data != null){
				var dataStr = data.trim();
				if(dataStr == "SUCCESS"){
					 $.messager.alert("系统提示","保存成功","info",function(){
						 goBack();
					  });
				}else if(dataStr == "EMPTY"){
					showMsg("系统提示","未查询到订单信息","error");
				}else if(dataStr == "FAIL"){
					showMsg("系统提示","保存失败","error");
				}else{
					showMsg("系统提示","系统异常，请联系管理员","error");
				}
			}
	  },"text");
}

//返回
function goBack(){
	var parames = "login_name=" + $("#select_login_name").val();
	parames += "&session_no=" + $("#session_no").val();
	parames += "&game_name=" + $("#game_name").val();
	parames += "&play_name=" + $("#play_name").val();
	parames += "&menuid=" + $("#menuid").val();
	window.location.href = $.getContextPath() + "lotteryOrder/gotoAbnormalOrder.do?" + parames;
}

//点击投注项复选框的方法(单选)
function checkOptionTitle(input){
	 $("#cashPrive").attr("checked",false);
	$("input[name='option']").not($(input)).attr("checked",false);
}
//点击原单开奖
function checkCashPrive(input){
	$("input[name='option']").not($(input)).attr("checked",false);
}

//点击投注复选框的方法(多选)
function checkOptionTitleMult(input,playName,optionTitle){
	 //取消按原单兑奖
	  $("#cashPrive").attr("checked",false);
	  //获取选中的投注
	  var optionCount = $("input[name='option']:checked").length;
	  var count = 0;
	  if(playName == "过关"){
		  count = optionTitle.split(";").length;
	  }else{
		  count = optionTitle.split(",").length;
	  }
	  if(count != 0 && optionCount > count){
		  $(input).attr("checked",false);
		  showMsg("系统提示","只能选择"+count+"个投注项","warning");
		  return false;
	  }
}
