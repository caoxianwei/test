$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
function loadTable(){
	var isAuditPower = $("#isAuditPower").val();
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'userAgencyAudit/queryData.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		idField:'user_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'login_name',title:'用户名',width:150},      
	        {field:'money',title:'余额',width:160},
	        {field:'status',title:'状态',width:150,formatter:function(value,row,index){
	        	if(value == "0"){
	        		return "禁用";
	        	}else if(value == "1"){
	        		return "启用";
	        	}else if(value == "2"){
	        		return "未激活";
	        	}
	        }},
	        {field:'bet_status',title:'允许投注',width:160,formatter:function(value,row,index){
	        	if(value == null || value == '' || value == "1"){
	        		return "允许";
	        	}else{
	        		return "拒绝";
	        	}
	        }},
	        {field:'proxy_status',title:'审核状态',width:160,formatter:function(value,row,index){
	        	if(value == "0"){
	        		return "待审核";
	        	}else if(value == "1"){
	        		return "审核通过";
	        	}else if(value == "2"){
	        		return "审核拒绝";
	        	}
	        }},
	        {field:'regist_date_time',title:'注册日期',width:180,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'oper',title:'操作',width:160,formatter:function(value,row,index){
	        	var str = "";
	        	if(isAuditPower == "1" && row.proxy_status == "0"){
	        		str = '<button id="updateA'+index+'" onclick="javascript:gotoAudit(\''+row.user_id+'\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color:#30acf2">审核</button>&nbsp;&nbsp;';
	        	}
	        	return str;
	        }}
	    ]],
	}); 
}

//查询注册代理
function queryData(){
	var login_name = $("#login_name").val();
	var startDate =  $("#startDate").val();
	var endDate =  $("#endDate").val();
	var proxy_status =  $("#proxy_status").val();
	reloadTable({
		tableId:'dg',
		params:{login_name:login_name,startDate:startDate,endDate:endDate,proxy_status:proxy_status}
	});
}

//到审核页面
function gotoAudit(userid){
	easyuiWidow({
		winId:'auditDiv',
		title:'审核',
		url:$.getContextPath() + 'userAgencyAudit/gotoAudit.do?user_id=' + userid,
		height:500
	}); 
}

//审核
function audit(){
	var userid = $("#userid").val();
	var proxy_status = $("#proxy_status").val();
	if($.isEmpty(proxy_status)){
		showMsg("系统提示","请选择审核状态","warning");
		return ;
	}
	saveForm({
		   formId:'ff',
		   url:$.getContextPath() + 'userAgencyAudit/audit.do',
		   queryParams:$("ff").serialize(),
		   callback:function(data){
			   if(data == "SUCCESS"){
					$.messager.alert("系统提示","审核成功","info",function(){
						closeDiv();
					});
				}else if(data == "FAIL"){
					showMsg("系统提示","审核失败","warning");
				}else if(data == "EMPTY"){
					showMsg("系统提示","未查询到审核信息","warning");
				}else{
					showMsg("系统提示","系统异常，请联系系统管理员","error");
				}
		   }
	   });
}

//关闭窗口
function closeWin(){
	$('#auditDiv').window('close'); 
	queryData();
}


//关闭窗口(在审核页面使用)
function closeDiv(){
	window.parent.closeWin();//关闭窗口
}
