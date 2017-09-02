$(function(){
	//加载数据表格
	var userid = $("#userid").val();
	loadTable({user_name:userid});
});

//加载数据表格
function loadTable(parames){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'userTrade/queryUserBalanceDetail.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		pageSize:20,
		queryParams:parames,
		idField:'trade_detail_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	    	{field:'user_id',title:'用户ID',width:120},   
	        {field:'login_name',title:'用户名',width:130},      
	        {field:'trade_type',title:'借贷类型',width:90,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "收入";
	        	}else if(value == "2"){
	        		return "支出";
	        	}
	        }},
	        {field:'cash_type',title:'交易类型',width:100,formatter:function(value,row,index){
	        	if(value=="301"){
	        		return "中奖";
	        	}else if(value == "302"){
	        		return "返点";
	        	}else if(value == "303"){
	        		return "打和";
	        	}else if(value == "304"){
	        		return "投注";
	        	}else if(value == "305"){
	        		return "投注退还";
	        	}else if(value == "306"){
	        		return "管理员充值";
	        	}else if(value == "307"){
	        		return "管理员扣款";
	        	}else if(value == "308"){
	        		return "提现";
	        	}else if(value == "309"){
	        		return "在线充值";
	        	}else if(value == "310"){
	        		return "注册赠送";
	        	}else if(value == "311"){
	        		return "投注";
	        	}else if(value == "312"){
	        		return "打和";
	        	}
	        }},
	        {field:'create_time',title:'交易时间',width:190,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'cash_money',title:'交易金额',width:120},
	        {field:'user_money',title:'余额',width:120},
	        {field:'user_type',title:'用户类型',width:100,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "注册用户";
	        	}else if(value == "02"){
	        		return "试玩用户";
	        	}else if(value == "03"){
	        		return "注册代理";
	        	}
	        }},
	        {field:'remark',title:'备注',width:330}
	    ]],
	}); 
}

//查询在线订单
function queryData(){
	var user_name = $("#user_name").val();
	var trade_type = $("#trade_type").val();
	var cash_type = $("#cash_type").val();
	var startDate = $("#startDate").val();
	var endDate =  $("#endDate").val();
	var userid = $("#userid").val();
	reloadTable({
		tableId:'dg',
		params:{user_name:userid,user_name:user_name,trade_type:trade_type,cash_type:cash_type,startDate:startDate,endDate:endDate}
	});
}
