$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'card/queryOnlineOrderData.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		pageSize:20,
		idField:'order_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'order_num',title:'订单号',width:180},      
	        {field:'login_name',title:'用户',width:120},
	        {field:'title',title:'标题',width:120},
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
	        	}
	        }},
	        {field:'pay_status',title:'付款',width:120,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "未付款";
	        	}else{
	        		return "已付款";
	        	}
	        }},
	        {field:'total_money',title:'付款金额',width:100},
	        {field:'create_time',title:'下单时间',width:160,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'pay_time',title:'付款时间',width:160,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	    ]],
	}); 
}

//查询在线订单
function queryOnlineOrder(){
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
