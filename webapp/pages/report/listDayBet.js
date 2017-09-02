$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	 $('#dg').datagrid({      
	    url:$.getContextPath() + 'statistics/queryDayBetCount.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		width:'99%',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'create_time',title:'日期',width:180,formatter:function(value,row,index){
	        	return getYear(value);
	        }},
	        {field:'total_point',title:'投注金额',width:180},
	        {field:'win_cash',title:'中奖金额',width:180},
	        {field:'profit_loss',title:'盈亏',width:180}
	    ]],
	}); 
}

//查询数据
function queryData(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	reloadTable({
		tableId:'dg',
		params:{startDate:startDate,endDate:endDate}
	});
}

