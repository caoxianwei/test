$(function(){
	$('#edit').window('close');  
	loadTable();
	//修改新增角色与修改角色中显示内容的div的宽度
	$("#showDiv").css("width","930px");
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'sysRole/queryData.do',
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
	    pageSize:10,
	    columns:[[      
	    	{field:'ck',checkbox:true },
	        {field:'role_name',title:'角色名称',width:200},      
	        {field:'remark',title:'备注',width:350}   
	    ]]      
	}); 
}

//到新增角色页面
function gotoAddRoleView(){
	easyuiWidow({
		winId:'roleDiv',
		title:'新增角色',
		url:$.getContextPath() + 'sysRole/gotoAddRoleView.do',
		height:500
	}); 
}

//到修改角色的页面
function gotoUpdateRoleView(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	easyuiWidow({
		winId:'roleDiv',
		title:'修改角色',
		url:$.getContextPath() + 'sysRole/gotoUpdateRoleView.do?role_id=' + row[0].role_id,
		height:500
	}); 
}

//删除角色数据
function deleteRoleData(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据删除","info");
		return;
	}
	var roleIds = new Array();
	for(var i=0;i<row.length;i++){
		roleIds.push(row[i].role_id);
	}
	deleteData({
		url:$.getContextPath() + 'sysRole/deleteData.do',
		params:{'roleIds':roleIds.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 reloadLocalTable();
				  });
			}else if(data == "FAIL"){
				 showMsg("系统提示","删除失败","warning");
			}else if(data == "EMPTY"){
				 showMsg("系统提示","提交的内容为空，请检查","warning");
			}else if(data == "NOTEXIST"){
				 showMsg("系统提示","无操作权限","warning");
			}else{
				showMsg("系统提示","系统异常，请联系系统管理员","error");
			}
		}
	});	
}


//关闭窗口
function closeWin(){
	$('#roleDiv').window('close'); 
	reloadLocalTable();
}

//刷新表格
function reloadLocalTable(){
	reloadTable({
		tableId:'dg'
	});
}


//保存角色数据
function addData(){
	var roleName = $("#role_name").val();
	if($.isEmpty(roleName)){
		showMsg("系统提示","请输入角色名","warning");
		return;
	}
   saveForm({
	   formId:'ff',
	   url:$.getContextPath() + 'sysRole/addData.do',
	   queryParams:$("ff").serialize(),
	   callback:function(data){
		   if(data == "SUCCESS"){
			   $.messager.alert("系统提示","保存成功","info",function(){
				   closeDiv();
			   });
		   }else if(data == "FAIL"){
			   showMsg("系统提示","保存失败","warning");
		   }else if(data == "EMPTY"){
				 showMsg("系统提示","提交的内容为空，请检查","warning");
		   }else if(data == "VALIDATE_FAIL"){
					showMsg("系统提示","提交的内容包含非法字符，请检查","warning");
		   }else if(data == "NOTEXIST"){
					showMsg("系统提示","无操作权限","warning");
		   }else if(data == "EXIST"){
			   showMsg("系统提示","角色名已存在","warning");
		   }else{
			   showMsg("系统提示","系统异常，请联系系统管理员","error");
		   }
	   }
   });
}

//修改角色数据
function updateData(){
	var roleName = $("#role_name").val();
	if($.isEmpty(roleName)){
		showMsg("系统提示","请输入角色名","warning");
		return;
	}
   saveForm({
	   formId:'ff',
	   url:$.getContextPath() + 'sysRole/updateData.do',
	   queryParams:$("ff").serialize(),
	   callback:function(data){
		   if(data == "SUCCESS"){
			   $.messager.alert("系统提示","修改成功","info",function(){
				   closeDiv();
			   });
		   }else if(data == "FAIL"){
			   showMsg("系统提示","修改失败","warning");
		   }else if(data == "EMPTY"){
				 showMsg("系统提示","提交的内容为空，请检查","warning");
		   }else if(data == "VALIDATE_FAIL"){
					showMsg("系统提示","提交的内容包含非法字符，请检查","warning");
		   }else if(data == "NOTEXIST"){
					showMsg("系统提示","无操作权限","warning");
		   }else if(data == "EXIST"){
			   showMsg("系统提示","角色名已存在","warning");
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
