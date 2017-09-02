$(function(){
	createCombobox();
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	 $('#dg').datagrid({      
	    url:$.getContextPath() + 'statistics/queryDataByGameType.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		width:'99%',
		idField:'session_no',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'session_no',title:'期号',width:100},      
	        {field:'start_time',title:'开始时间',width:140,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'end_time',title:'结束时间',width:140,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'total_point',title:'投注金额',width:120},
	        {field:'win_cash',title:'用户中奖',width:120},
	        {field:'profit_loss',title:'盈亏',width:120}
	    ]],
	}); 
}

//创建下拉列表框
function createCombobox(){
	$('#game_type').combobox({    
	    url:'bet/querySessionList.do',    
	    valueField:'game_type',    
	    textField:'game_title',
	    onLoadSuccess:function(){
	    	//加载完成后默认选中第二个 (北京三分彩的)
	    	var val = $(this).combobox('getData');
	    	$(this).combobox('select', val[1].game_type);
	    }
	});  
}

//查询数据
function queryData(){
	var game_type = $("#game_type").val();
	var session_no = $("#session_no").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	reloadTable({
		tableId:'dg',
		params:{game_type:game_type,session_no:session_no,startDate:startDate,endDate:endDate}
	});
}

