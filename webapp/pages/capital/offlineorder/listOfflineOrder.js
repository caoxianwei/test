$(function(){
	//加载数据表格
	var user_name = $("#user_name").val();
	var order_num = $("#order_num").val();
	var pay_status = $("#pay_status").val();
	var startDate = $("#startDate").val();
	var endDate =  $("#endDate").val();
	loadTable({user_name:user_name,order_num:order_num,pay_status:pay_status,startDate:startDate,endDate:endDate});
});

//加载数据表格
function loadTable(parames){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'card/queryOfflineOrderData.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		pageSize:20,
		idField:'order_id',
		queryParams:parames,
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	    	{field:'ck',checkbox:true },
	        {field:'order_num',title:'订单号',width:160},      
	        {field:'login_name',title:'用户',width:120},
	        {field:'money',title:'余额',width:120},
	        {field:'pay_type',title:'支付方式',width:120,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "支付宝";
	        	}else if(value == "2"){
	        		return "银联";
	        	}else if(value == "3"){
	        		return "线下支付";
	        	}else if(value == "4"){
	        		return "积分";
	        	}else if(value == "5"){
	        		return "微信";
	        	}else if(value == "7"){
	        		return "微信线下转账";
	        	}else if(value == "8"){
	        		return "支付宝线下转账";
	        	}
	        }},
	        {field:'pay_status',title:'处理状态',width:120,formatter:function(value,row,index){
	        	if(value == "0"){
	        		return "未处理";
	        	}else if(value == "1"){
	        		return "已拒绝";
	        	}else if(value == "2"){
	        		return "已充值";
	        	}
	        }},
	        {field:'total_money',title:'付款金额',width:120},
	        {field:'create_time',title:'下单时间',width:160,formatter:function(value,row,index){
	        	return formatDate(value);
	        }}
	    ]],
	}); 
}

//查询在线订单
function queryOfflineOrder(){
	var user_name = $("#user_name").val();
	var order_num = $("#order_num").val();
	var pay_status = $("#pay_status").val();
	var startDate = $("#startDate").val();
	var endDate =  $("#endDate").val();
	reloadTable({
		tableId:'dg',
		params:{user_name:user_name,order_num:order_num,pay_status:pay_status,startDate:startDate,endDate:endDate}
	});
}

//到线下订单详细信息页面
function gotoOfflineOrderInfo(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据查看","info");
		return;
	}
	var parames = "menuid=" + $("#menuid").val();
	parames += "&order_id=" + row[0].order_id;
	parames += "&user_name=" + $("#user_name").val();
	parames += "&order_num=" + $("#order_num").val();
	parames += "&pay_status=" + $("#pay_status").val();
	parames += "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	window.location.href = $.getContextPath() + "card/gotoOfflineOrderInfo.do?" + parames
}


