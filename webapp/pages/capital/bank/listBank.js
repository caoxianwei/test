$(function(){
	//加载数据表格
	var bank_name = $("#bank_name").val();
	var bank_account = $("#bank_account").val();
	loadTable({bank_name:bank_name,bank_account:bank_account});
});

//加载数据表格
var datagrid ;
function loadTable(parames){
	datagrid = $('#dg').datagrid({      
	    url:$.getContextPath() + 'bank/queryData.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		queryParams:parames,
		idField:'bank_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	    	{field:'ck',checkbox:true },
	        {field:'bank_name',title:'银行名称',width:150},      
	        {field:'bank_account',title:'银行账号',width:120},
	        {field:'user_name',title:'姓名',width:80},
	        {field:'country',title:'国家',width:200}
	    ]],
	}); 
}


//到添加银行信息页面
function gotoAddData(){
	easyuiWidow({
		winId:'cashDiv',
		title:'添加银行信息',
		url:$.getContextPath() + 'bank/gotoAddBank.do',
		height:500
	}); 
}
//到修改银行信息页面
function gotoUpdateData(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据审核","info");
		return;
	}
	easyuiWidow({
		winId:'cashDiv',
		title:'修改银行信息',
		url:$.getContextPath() + 'bank/gotoUpdateBank.do?bank_id=' + row[0].bank_id,
		height:500
	}); 
}

//删除银行数据
function deleteBankData(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据删除","warning");
		return;
	}
	var ids = new Array();
	for(var i=0;i<row.length;i++){
		ids.push(row[i].bank_id);
	}
	deleteData({
		url:$.getContextPath() + 'bank/deleteData.do',
		params:{'ids':ids.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 queryCashData();
				  });
			}else if(data == "FAIL"){
				showMsg("系统提示","删除失败","warning");
			}else if(data == "EMPTY"){
				showMsg("系统提示","传入的内容为空，请检查","warning");
			}else if(data == "NOTEXIST"){
				showMsg("系统提示","无操作权限","warning");
			}else{
				showMsg("系统提示","系统异常，请联系系统管理员","error");
			}
		}
	});	
}

//保存银行信息
function addData(){
	var bank_account = $("#add_bank_account").val();
	if(!validateBankAccount(bank_account)){
		showMsg("系统提示","请输入正确的银行卡号","warning");
		return;
	}
	var add_bank_name = $("#add_bank_name").val();
	if($.isEmpty(add_bank_name)){
		showMsg("系统提示","请输入银行名称","warning");
		return;
	}
	var add_user_name = $("#add_user_name").val();
	if($.isEmpty(add_user_name)){
		showMsg("系统提示","请输入姓名","warning");
		return;
	}
	var add_country = $("#add_country").val();
	if($.isEmpty(add_country)){
		showMsg("系统提示","请输入城市","warning");
		return;
	}
	saveForm({
		   formId:'ff',
		   url:$.getContextPath() + 'bank/addData.do',
		   queryParams:$("ff").serialize(),
		   callback:function(data){
			   if(data == "SUCCESS"){
				   $.messager.alert("系统提示","保存成功","info",function(){
					   closeDiv();
				   });
			   }else if(data == "FAIL"){
				   showMsg("系统提示","保存失败","warning");
			   }else if(data == "EMPTY"){
					showMsg("系统提示","传入的内容为空，请检查","warning");
				}else if(data == "VALIDATE_FAIL"){
					showMsg("系统提示","提交的内容包含非法字符，请检查","warning");
				}else if(data == "NOTEXIST"){
					showMsg("系统提示","无操作权限","warning");
				}else{
				   showMsg("系统提示","系统异常，请联系系统管理员","error");
			   }
		   }
	   });
}

//修改银行信息
function udateData(){
	var bank_account = $("#update_bank_account").val();
	if(!validateBankAccount(bank_account)){
		showMsg("系统提示","请输入正确的银行卡号","warning");
		return;
	}
	var update_bank_name = $("#update_bank_name").val();
	if($.isEmpty(update_bank_name)){
		showMsg("系统提示","请输入银行名称","warning");
		return;
	}
	var update_user_name = $("#update_user_name").val();
	if($.isEmpty(update_user_name)){
		showMsg("系统提示","请输入姓名","warning");
		return;
	}
	var update_country = $("#update_country").val();
	if($.isEmpty(update_country)){
		showMsg("系统提示","请输入城市","warning");
		return;
	}
	saveForm({
		   formId:'ff',
		   url:$.getContextPath() + 'bank/updateData.do',
		   queryParams:$("ff").serialize(),
		   callback:function(data){
			   if(data == "SUCCESS"){
				   $.messager.alert("系统提示","保存成功","info",function(){
					   closeDiv();
				   });
			   }else if(data == "FAIL"){
				   showMsg("系统提示","保存失败","warning");
			   }else if(data == "EMPTY"){
					showMsg("系统提示","传入的内容为空，请检查","warning");
			   }else if(data == "VALIDATE_FAIL"){
					showMsg("系统提示","提交的内容包含非法字符，请检查","warning");
			   }else if(data == "NOTEXIST"){
					showMsg("系统提示","无操作权限","warning");
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
	queryCashData();
}

//刷新表格
function reloadLocalTable(){
	reloadTable({
		tableId:'dg'
	});
}

//查询提现申请数据
function queryCashData(){
	var bank_name = $("#bank_name").val();
	var bank_account = $("#bank_account").val();
	reloadTable({
		tableId:'dg',
		params:{bank_name:bank_name,bank_account:bank_account}
	});
}

