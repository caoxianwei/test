$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	var isSavePower = $("#isSavePower").val();
	 $('#dg').datagrid({      
	    url:$.getContextPath() + 'bj3/queryHandDrawData.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		width:'99%',
		idField:'session_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'session_no',title:'期号',width:120},      
	        {field:'start_time',title:'开始时间',width:150,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'end_time',title:'结束时间',width:150,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'open_result',title:'结果',width:300,formatter:function(value,row,index){
	        	var str = "";
	        	if($.isEmpty(value)){
	        		str += '<input id="open_result_'+row.session_id+'" class="dg-input"  style="width:290px;" type="text" /><br/>';
	        	}else{
	        		str += '<input id="open_result_'+row.session_id+'" value='+value+' class="dg-input"  style="width:290px;" type="text" /><br/>';
	        	}
	        	str += '<span style="color:red">每个数字之间用逗号隔开。 例如：1,2,5,6,8</span>';
	        	return str;
	        }},
	        {field:'oper',title:'操作',width:90,formatter:function(value,row,index){
	        	if(isSavePower == "1"){
	        		var str = '<button id="updateA'+index+'" onclick="javascript:saveResult(\''+row.session_id+'\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color:#30acf2">保存结果</button>&nbsp;&nbsp;';
		        	return str;
	        	}else{
	        		return "";
	        	}
	        }}
	    ]],
	}); 
}

//保存开奖结果
function saveResult(sessionId){
	var open_result = $("#open_result_" + sessionId).val();
	if($.isEmpty(open_result)){
		showMsg("系统提示","请输入开奖结果","warning");
		return ;
	}
	$.messager.confirm('系统提示',"确定要保存开奖结果吗？开奖号码：" + open_result,function(r){
		if(r){
			$.post($.getContextPath() +"bj3/saveOpenResult.do",{session_id:sessionId,open_result:open_result},
					function(data) {
						if (data == "SUCCESS") {
							$.messager.alert("系统提示","保存成功","info",function(){
								window.location.reload();
							});
						}else if(data == "FAIL"){
							showMsg("系统提示","保存失败","warning");
						}else if(data == "NOTEXIST"){
							showMsg("系统提示","您没有操作权限","warning");
						}else if(data == "VALIDATE_FAIL"){
							showMsg("系统提示","请输入正确的开奖结果","warning");
						}else if(data == "EMPTY"){
							showMsg("系统提示","未查询到期号信息","warning");
						}else if(data == "LOTTERY"){
							showMsg("系统提示","当前期正在开奖或已开奖","warning");
						}else{
							showMsg("系统提示","系统异常，请联系系统管理员","error");
						}
			},"text");
		}
	});
}

//查询数据
function queryData(){
	var session_no = $("#session_no").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	reloadTable({
		tableId:'dg',
		params:{session_no:session_no,startDate:startDate,endDate:endDate}
	});
}

