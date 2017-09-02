$(function(){
	//加载数据表格
	loadTable();
	//查询提现金额
	getCashMoneyByParam();
});

//加载数据表格
var datagrid ;
function loadTable(){
	var isAuditPower = $("#isAuditPower").val();
	datagrid = $('#dg').datagrid({      
	    url:$.getContextPath() + 'cashApply/queryData.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		width:'99%',
		idField:'apply_cash_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'login_name',title:'用户',width:120,formatter:function(value,row,index){
	        	var str = '<a href="javascript:gotoCashApplyInfo(\''+row.user_id+'\')">'+value+'</a>';
	        	return str;
	        }},      
	        {field:'bank_name',title:'银行',width:120},
	        {field:'user_name',title:'开户名',width:80},
	        {field:'account_no',title:'账户',width:180},
	        {field:'cash_money',title:'提现金额',width:90},
	        {field:'create_time',title:'申请时间',width:165,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'audit_time',title:'审核时间',width:165,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'audit_status',title:'审核状态',width:90,formatter:function(value,row,index){
	        	if(value == "0"){
	        		return "待审核";
	        	}else if(value == "1"){
	        		return "审核通过";
	        	}else if(value == "2"){
	        		return "审核未通过";
	        	}
	        }},
	        {field:'oper',title:'操作',width:130,formatter: function(value,row,index){
	        	var auditStatus = row.audit_status;
	        	if(auditStatus == "0" && isAuditPower == "1"){
	        		var str = '<button id="updateA'+index+'" onclick="javascript:auditCashApply(\''+row.apply_cash_id+'\',\'1\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color:#30acf2">通过</button>&nbsp;&nbsp;';
		        	str += '<button id="savaA'+index+'" onclick="javascript:auditCashApply(\''+row.apply_cash_id+'\',\'2\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color: #30acf2">拒绝</button>';
		        	return str;
	        	}
	        	return "";
	        }}
	    ]],
	}); 
}

//到提现详细页面
function gotoCashApplyInfo(userid){
	window.location.href = $.getContextPath() + 'cashApply/gotoCashApplyInfo.do?userid=' + userid + "&menuid=" + $("#menuid").val();
}
var flag = false;
//审核提现申请 
function auditCashApply(cash_id,audit_status){
	if(flag == true){
		showMsg("系统提示","请不要重复提交数据","warning");
		return;
	}
	flag = true;
	var msg = "确定审核通过吗？";
	if(audit_status == "2"){
		msg = "确定拒绝吗？";
	}
	$.messager.confirm('系统提示',msg + "操作后将不可更改。",function(r){
	      if(r){
	    	  $.post($.getContextPath() + 'cashApply/saveAuditing.do',{apply_cash_id:cash_id,audit_status:audit_status},function(data){
	    		  flag = false;
	    		  if(data == "SUCCESS"){
	    				$.messager.alert("系统提示","审核成功","info",function(){
	    					   queryCashData();
	    				   });
	    			   }else if(data == "FAIL"){
	    				   showMsg("系统提示","审核失败","warning");
	    			   }else if(data == "EMPTY"){
	    					showMsg("系统提示","未查询到审核记录","warning");
	    			   }else if(data == "NOTEXIST"){
	    					showMsg("系统提示","无操作权限","warning");
	    			   }else{
	    				   showMsg("系统提示","系统异常，请联系系统管理员","error");
	    			   }
	    		},"text");
	      }else{
	    	  flag = false;
	      }
	 });
}

//到提现审核页面的页面
function gotoAuditing(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据审核","info");
		return;
	}
	if(row[0].audit_status == "1"){
		showMsg("系统提示","审核已通过，不需要再次审核","info");
		return;
	}
	if(row[0].audit_status == "2"){
		showMsg("系统提示","审核不通过，不需要再次审核","info");
		return;
	}
	easyuiWidow({
		winId:'cashDiv',
		title:'用户提现审核',
		url:$.getContextPath() + 'cashApply/gotoAuditing.do?id=' + row[0].apply_cash_id,
		height:500
	}); 
}

//保存提现审核
function addData(){
	var id = $("#id").val();
	var audit_status = $("#audit_status").val();
	if(audit_status == null || audit_status.length == 0){
		showMsg("系统提示","请选择审核状态","info");
		return ;
	}
	saveForm({
		   formId:'ff',
		   url:$.getContextPath() + 'cashApply/saveAuditing.do',
		   queryParams:$("ff").serialize(),
		   callback:function(data){
			   if(data == "SUCCESS"){
				   $.messager.alert("系统提示","保存成功","info",function(){
					   closeDiv();
				   });
			   }else if(data == "FAIL"){
				   showMsg("系统提示","保存失败","error");
			   }else if(data == "EMPTY"){
					showMsg("系统提示","提交的内容为空，请检查","error");
			   }else if(data == "VALIDATE_FAIL"){
					showMsg("系统提示","提交的内容包含非法字符，请检查","error");
			   }else if(data == "NOTEXIST"){
					showMsg("系统提示","无操作权限","error");
			   }else{
				   showMsg("系统提示","系统异常，请联系系统管理员","error");
			   }
		   }
	   });
}

//关闭窗口(在新增与修改页面使用)
function closeDiv(){
	window.parent.closeWin();//关闭窗口
}
//关闭窗口
function closeWin(){
	$('#cashDiv').window('close'); 
	reloadLocalTable();
}

//刷新表格
function reloadLocalTable(){
	reloadTable({
		tableId:'dg'
	});
}

//查询提现申请数据
function queryCashData(){
	var audit_status = $("#audit_status").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var login_name = $("#login_name").val();
	reloadTable({
		tableId:'dg',
		params:{login_name:login_name,audit_status:audit_status,startDate:startDate,endDate:endDate}
	});
	//更新提现总金额
	getCashMoneyByParam();
}

//根据条件获取提现金额
function getCashMoneyByParam(){
	var parames = "login_name=" + $("#login_name").val();
	parames += "&audit_status=" + $("#audit_status").val();
	parames += "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	$.post($.getContextPath() +"cashApply/getCashMoneyByParam.do",parames,function(data){
		if(!$.isEmpty(data)){
			$("#cashMoneySpan").html(data);
		}else{
			$("#cashMoneySpan").html(0);
		}
	},"text");
}

//导出excel
function exportExcel(){
	$("#exportExcelForm").submit();
}
//提交表单的回调函数
function callback(data){
	if("EMPTY" == data){
		showMsg("系统提示","无提现数据","info");
	}else if("NOTEXIST" == data){
		showMsg("系统提示","无导出权限","info");
	}else{
		showMsg("系统提示","系统异常，请联系系统管理员","error");
	}
}

