$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'userLog/queryData.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		idField:'user_log_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'login_name',title:'用户名',width:150},      
	        {field:'date_time',title:'登录时间',width:160,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'ip_address',title:'登录IP',width:150},
	        {field:'login_address',title:'登录地址',width:160},
	        {field:'action_text',title:'备注',width:160}
	    ]],
	}); 
}

//查询在线订单
function queryData(){
	var login_name = $("#login_name").val();
	var ip_address =  $("#ip_address").val();
	reloadTable({
		tableId:'dg',
		params:{login_name:login_name,ip_address:ip_address}
	});
}
