$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'users/queryTodayRegistUser.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:false,
		pagination:true,
		pageSize:20,
		idField:'user_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	    	{field:'user_id',title:'ID',width:150},   
	        {field:'login_name',title:'用户名',width:150}, 
	        {field:'user_type',title:'用户类型',width:150,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "注册用户";
	        	}else if(value=="02"){
	        		return "试玩用户";
	        	}else if(value == "03"){
	        		return "注册代理";
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
	var userName =  $("#userName").val();
	var user_type = $("#user_type").val();
	reloadTable({
		tableId:'dg',
		params:{userName:userName,user_type:user_type}
	});
}
