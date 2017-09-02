$(function(){
	createCombobox();
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	 $('#dg').datagrid({      
	    url:$.getContextPath() + 'bet/betManager.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		idField:'bet_detail_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	    	{field:'ck',checkbox:true },
	        {field:'session_no',title:'期号',width:80},      
	        {field:'user_id',title:'ID',width:60},
	        {field:'login_name',title:'用户名',width:100},
	        {field:'play_name',title:'玩法',width:90},
	        {field:'option_title',title:'投注名称',width:140,formatter:function(value,row,index){
	        	return row.bet_name + "&nbsp;&nbsp;&nbsp;" + value;
	        }},
	        {field:'bet_time',title:'投注时间',width:147,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'bet_money',title:'投注金额',width:90},
	        {field:'open_result',title:'开奖结果',width:140},
	        {field:'win_result',title:'中奖',width:60,formatter:function(value,row,index){
	        	var bet_flag = row.bet_flag;
	        	if(bet_flag == '0'){
	        		return "撤单";
	        	}else{
	        		var str = "";
		        	if(value == "0"){
		        		str = "未开奖";
		        	}else if(value == "1"){
		        		str = "中奖";
		        	}else if(value == "2"){
		        		str = "未中奖";
		        	}else if(value == "3"){
		        		str = "打和";
		        	}else if(value == "4"){
		        		str = "撤单";
		        	}
		        	return str;
	        	}
	        }},
	        {field:'win_cash',title:'中奖金额',width:70}
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
	var login_name=$("#login_name").val();
	var session_no = $("#session_no").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var win_result = $("#win_result").val();
	reloadTable({
		tableId:'dg',
		params:{game_type:game_type,login_name:login_name,session_no:session_no,win_result:win_result,startDate:startDate,endDate:endDate}
	});
}

//查看详情
function seeInfo(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据查看","warning");
		return;
	}
	var url = $.getContextPath() + 'bet/initBetDetail.do?bet_detail_id=' + row[0].bet_detail_id;
	$("#gameInfoDiv").window({
		 title:"查看投注详情",
	     width:800,   
	     height:500,   
		 content:$.createFrame(url),
		 collapsible:false,	
		 modal:true,
		 top:10,
		 disabled:true,
		 draggable:false,
		 minimizable:false,
		 maximized:false,
		 onOpen:function(){
		    $("#gameInfoDiv").window("center");
		 }
	});
}

//关闭窗口
function closeWin(){
	$('#gameInfoDiv').window('close'); 
}

//关闭父页面窗口
function closeDiv(){
	window.parent.closeWin();
}
