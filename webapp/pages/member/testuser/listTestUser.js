$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'users/queryTestUser.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:false,
		pagination:true,
		pageSize:20,
		idField:'user_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'login_name',title:'用户名',width:150},      
	        {field:'money',title:'余额',width:120},
	        {field:'status',title:'状态',width:120,formatter:function(value,row,index){
	        	if(value == "0"){
	        		return "禁用";
	        	}else if(value == "1"){
	        		return "启用";
	        	}else if(value == "2"){
	        		return "未激活";
	        	}
	        }},
	        {field:'bet_status',title:'允许投注',width:120,formatter:function(value,row,index){
	        	if(value == null || value.length == 0 || value == "1"){
	        		return "允许";
	        	}else if(value == "0"){
	        		return "禁止";
	        	}
	        }},
	        {field:'regist_date_time',title:'注册日期',width:160,formatter:function(value,row,index){
	        	return formatDate(value);
	        }}
	    ]],
	}); 
}

//查询在线订单
function queryData(){
	var startDate = $("#startDate").val();
	var endDate =  $("#endDate").val();
	reloadTable({
		tableId:'dg',
		params:{startDate:startDate,endDate:endDate}
	});
}
