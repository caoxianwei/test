$(function(){
	getValidBetMoney();
	//加载数据表格
	var userid = $("#userid").val();
	loadTable({userName:userid});
});

//加载数据表格
function loadTable(parames){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'userBet/queryBetList.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:false,
		pagination:true,
		pageSize:20,
		queryParams:parames,
		idField:'bet_detail_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	    	{field:'user_id',title:'用户ID'},
	        {field:'login_name',title:'用户名'},      
	        {field:'game_name',title:'彩种'},
	        {field:'session_no',title:'期号'},
	        {field:'bet_time',title:'投注时间',formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'play_name',title:'玩法'},
	        {field:'option_title',title:'投注项',formatter:function(value,row,index){
	        	var bet_name = row.bet_name;
	        	if(bet_name == null){
	        		bet_name="";
	        	}
	        	return bet_name + "&nbsp;&nbsp;&nbsp;" + value;
	        }},
	        {field:'open_result',title:'开奖结果',width:180},
	        {field:'bet_money',title:'投注金额'},
	        {field:'bet_flag',title:'中奖',formatter:function(value,row,index){
	        	//win_result
	        	if(value == "0"){
	        		return "撤单";
	        	}else if(value == "1"){
	        		var win_result = row.win_result;
	        		if(win_result == "0"){
	        			return "未开奖";
	        		}else if(win_result == "1"){
	        			return "中奖";
	        		}else if(win_result == "2"){
	        			return "不中奖";
	        		}else if(win_result == "3"){
	        			return "打和";
	        		}else if(win_result == "4"){
	        			return "撤单";
	        		}
	        	}
	        }},
	        {field:'bet_rate',title:'赔率',formatter:function(value,row,index){
	        	var bet_rate2 = row.bet_rate2;
	        	if(bet_rate2 == null || bet_rate2.trim().length == 0){
	        		return value;
	        	}
	        	return bet_rate2;
	        }},
	        {field:'win_cash',title:'盈亏'}
	    ]],
	}); 
}

//查询在线订单
function queryData(){
	var user_name = $("#user_name").val();
	var session_no = $("#session_no").val();
	var bet_flag = $("#bet_flag").val();
	var game_name = $("#game_name").val();
	var play_name = $("#play_name").val();
	var startDate = $("#startDate").val();
	var endDate =  $("#endDate").val();
	var userid = $("#userid").val();
	reloadTable({
		tableId:'dg',
		params:{userName:userid,user_name:user_name,session_no:session_no,bet_flag:bet_flag,game_name:game_name,play_name:play_name,startDate:startDate,endDate:endDate}
	});
	getValidBetMoney();
}

//获取有效投注金额
function getValidBetMoney(){
	var user_name = $("#user_name").val();
	var session_no = $("#session_no").val();
	var game_name = $("#game_name").val();
	var play_name = $("#play_name").val();
	var startDate = $("#startDate").val();
	var endDate =  $("#endDate").val();
	var userid = $("#userid").val();
	$.post($.getContextPath() +"userBet/queryValidBetMoney.do",{user_name:user_name,session_no:session_no,game_name:game_name,play_name:play_name,startDate:startDate,endDate:endDate,userName:userid}
	  ,function(data){
		  if(!$.isEmpty(data)){
			  $("#validMoney").text(data);
		  }
	  },"text");
}
