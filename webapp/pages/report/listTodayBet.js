$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	 $('#dg').datagrid({      
	    url:$.getContextPath() + 'statistics/queryTodayBetStatistic.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:false,
		width:'99%',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'total_point',title:'投注金额',width:180},      
	        {field:'win_cash',title:'中奖金额',width:180},
	        {field:'profit_loss',title:'盈亏',width:180}
	    ]],
	}); 
}


