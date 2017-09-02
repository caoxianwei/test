//手动开奖的js
$(function(){
	
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'lotteryOrder/queryAbnormalOrderData.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:false,
		pagination:true,
		pageSize:20,
		idField:'bet_detail_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'bet_name',title:'投注项'},      
	        {field:'option_title',title:'具体投注项'},
	        {field:'bet_money',title:'投注金额'},
	        {field:'bet_rate',title:'赔率',formatter:function(value,row,index){
	        	var bet_rate2 = row.bet_rate2;
	        	if(bet_rate2 == null || bet_rate2.length == 0){
	        		return value;
	        	}
	        	return bet_rate2;
	        }},
	        {field:'win_cash',title:'中奖金额'},
	        {field:'win_cash',title:'是否中奖'},
	        {field:'bet_time',title:'投注时间'},
	    ]],
	}); 
}



//更新异常订单
function updateData(){
	  var optionId = $("input[name='option']:checked").val();
	  var parames = "orderid=" + $("#order_id").val();
	  if(optionId == null || optionId.length == 0){
		  showMsg("系统提示","请选择投注项","warning");
		  return ;
	  }
	  if(optionId.trim() == "-1"){
		  //按原单计算
	  }else{
		  var optionTitle = $("input[name='optionTitleName_"+optionId+"'").val();//名称
		  parames += "&optionIds=" + optionId;
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

//点击投注项复选框的方法
function checkOptionTitle(input){
	$("input[name='option']").not($(input)).attr("checked",false);
}

