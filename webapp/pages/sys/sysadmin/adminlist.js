$(function(){
	//
	initDepartmentTable();
});
/**
 * 
 */
function initDepartmentTable(){
	$('#table').datagrid({
		tableId:'table',
		url:$.getContextPath() + 'sysadmin/query.do',
		idField:'admin_id',
		striped:true,
		nowrap:false,
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
		pagination:true,
		pageSize:20,
		loadMsg:'正在加载数据，请稍等......',
		columns:[[
			{field : 'admin_id',checkbox : true,align : 'center'},
			{title : '<span class="header_name">真实姓名<span>',field : 'real_name',width : 150},
			{title : '<span class="header_name">登录账号<span>',field : 'login_name',width : 150},
			{title : '<span class="header_name">状态<span>',field : 'status',width : 150,formatter:function(value,rows,index){			  
				if(value==1){
					return '<span id="s_'+rows.admin_id+'">启用</span>';
				}else if(status==2){
					return '<span id="s_'+rows.admin_id+'">登陆错误禁用</span>';
				}else{
					return '<span id="s_'+rows.admin_id+'">系统禁用</span>';
				}
			}}
			]]
	});
}
function loadNewPage(){
	$('#addWin').window('close'); 
	submitquery();
}
function submitquery(){
	var real_name = $("#real_name").val();
	var login_name = $("#login_name").val();
	var params = {"real_name":real_name,"login_name":login_name};
	reloadTable({tableId:'table',params:params});
}
//新增
function addBtn(){
	easyuiWidow({
		title:'新增人员',
		winId:'addWin',
		width:800,   
		height:500,
		max:false,
		iconCls:'icon-win-addmenu',
		url:"sysadmin/gotoAddAdmin.do"
	});

}
//修改数据
function updateBtn(){
	var rows = $("#table").datagrid("getSelections");
	var len = rows.length;
	if(len<1){
		$.messager.alert("系统提示", "请选择要修改的数据！","warning");
		return;
	}else if(len>1){
		$.messager.alert("系统提示", "每次只能修改一条数据，请重新选择！","warning");
		return;
	}
	updateRowData(rows[0].admin_id);   

}

function updateRowData(admin_id){  
	var url = "sysadmin/gotoUpdateAdmin.do?admin_id="+admin_id;
	easyuiWidow({
		title:'修改信息',
		winId:'addWin',
		width:800,   
		height:500,
		max:false,
		iconCls:'icon-win-updatemenu',
		url:url
	});
}
//删除数据
$("#deleteBtn").click(function(){ 
	var rows = $('#table').datagrid('getSelections');
	var len = rows.length;
	if(len==0){
		$.messager.alert("系统提示","请选择要删除的记录","warning");
		return;
	}
	var ids = new Array();
	for(var i = 0;i<len;i++){     
		ids.push(rows[i].admin_id);
	}
	deleteRowData(ids);
});


//删除数据
function deleteRowData(idss){
	var len = 1;
	var ids = new Array();
	if(typeof(menuIds)!='string'){
		len = idss.length;
		ids = idss;
	}else{
		ids.push(idss);
	}
	var url = "sysadmin/delDates.do";
	//删除数据
	deleteData({
		len:len,
		url:url,
		params:{'ids':ids,'version':Math.random()},
		dataType:'text',
		callback:function(msg){
			if(msg=="EMPTY"){
				$.messager.alert("系统提示","请选择要删除的记录","warning");
			}else if(msg=="FAIL"){
				$.messager.alert("系统提示","删除失败","warning");
			}else if(msg=="SUCCESS"){
				reloadTable({tableId:'table'});
			}else{
				$.messager.alert("系统提示","系统出现异常："+msg,"error");
			}
		}
	});
}

//重置密码
function resetPdw(){   
	var rows = $('#table').datagrid('getSelections');
	var len = rows.length;
	if(len!=1){
		$.messager.alert("系统提示","请选择要一个需要重置密码用户!","warning");
		return;
	}

	var url = "sysadmin/updatePassword.do";
	var admin_id = rows[0].admin_id;
	$.messager.confirm("提示","确定重置这"+len+"个用户密码?",function(r){
		if(r){
			$.ajax({
				url:url,
				data:{'admin_id':admin_id,'version':Math.random()},
				dataType:'text',
				success:function(msg){
					if(msg=="EMPTY"){
						$.messager.alert("系统提示","请选择要重置密码的用户!","warning");
					}else if(msg=="FAIL"){
						$.messager.alert("系统提示","密码重置失败","warning");
					}else if(msg=="SUCCESS"){
						$.messager.alert("系统提示","密码重置成功","info");
						reloadTable({tableId:'table'});
					}else{
						$.messager.alert("系统提示","系统出现异常,或无权限","error");
					}
				}
			});
		}
	});
}

function statusDisable(){
	var rows = $('#table').datagrid('getSelections');
	var len = rows.length;

	if(len==0){
		if(type=1){
			$.messager.alert("系统提示","请选择要启用的用户!","warning");
		}else{
			$.messager.alert("系统提示","请选择要禁用的用户!","warning");
		}
		return;
	}
	var url = "sysadmin/statusDisable.do";
	var admin_id = rows[0].admin_id;
	$.messager.confirm("提示","确定更改这"+len+"个用户登录状态?",function(r){
		if(r){
			$.ajax({
				url:url,
				data:{'admin_id':admin_id,'version':Math.random()},
				dataType:'text',
				success:function(msg){
					if(msg=="EMPTY"){
						$.messager.alert("系统提示","请选择要重置用户!","warning");
					}else if(msg=="FAIL"){
						$.messager.alert("系统提示","更改失败","warning");
					}else if(msg=="SUCCESS"){
						$.messager.alert("系统提示","更改成功","info");
						$("#s_"+admin_id).html("禁用");
					}else{
						$.messager.alert("系统提示","系统出现异常："+msg,"error");
					}
				}
			});
		}
	});

}

function statusEnable(){
	var rows = $('#table').datagrid('getSelections');
	var len = rows.length;

	if(len==0){
		if(type=1){
			$.messager.alert("系统提示","请选择要启用的用户!","warning");
		}else{
			$.messager.alert("系统提示","请选择要禁用的用户!","warning");
		}
		return;
	}
	var url = "sysadmin/statusEnable.do";
	var admin_id = rows[0].admin_id;
	$.messager.confirm("提示","确定更改这"+len+"个用户登录状态?",function(r){
		if(r){
			$.ajax({
				url:url,
				data:{'admin_id':admin_id,'version':Math.random()},
				dataType:'text',
				success:function(msg){
					if(msg=="EMPTY"){
						$.messager.alert("系统提示","请选择要重置用户!","warning");
					}else if(msg=="FAIL"){
						$.messager.alert("系统提示","更改失败","warning");
					}else if(msg=="SUCCESS"){
						$.messager.alert("系统提示","更改成功","info");
						$("#s_"+admin_id).html("启用");
					}else{
						$.messager.alert("系统提示","系统出现异常："+msg,"error");
					}
				}
			});
		}
	});

}


//取消登陆的限制
function cleanLoginDisable(){
	var rows = $('#table').datagrid('getSelections');
	var len = rows.length;
	if(len==0){
		$.messager.alert("系统提示","请选择要取消取消登陆的限制的用户!","warning");
		return;
	}
	var id = rows[0].admin_id;
	var parames = "admin_id=" + id;
	$.post("sysadmin/updateAttrTimes.do",parames,function(data){
		if("SUCCESS"==data.trim()){
			$("#s_"+id).html("启用");
			$.messager.alert("系统提示","修改成功!","info");
		}else if("FAIL"==data.trim()){
			$.messager.alert("系统提示","修改失败!","error");
		}else{
			$.messager.alert("系统提示","请联系开发员!","error");
		}
	},"text");
}

