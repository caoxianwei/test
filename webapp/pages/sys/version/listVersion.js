$(function(){
	$('#edit').window('close');  
	loadTable();
	//修改新增角色与修改角色中显示内容的div的宽度
	$("#showDiv").css("width","930px");
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'sysVersion/queryData.do',
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
	    pageSize:10,
	    columns:[[      
	    	{field:'ck',checkbox:true },
	    	{field:'ver',title:'版本',width:100},
	    	{field:'app_type',title:'APP版本',width:100,formatter:function(value,row,index){
	        	if(value == '1'){
	        		return "用户版";
	        	}else if(value == "2"){
	        		return "商家版";
	        	}
	        }},
	        {field:'type',title:'设备类型',width:100,formatter:function(value,row,index){
	        	if(value == '1'){
	        		return "ios";
	        	}else if(value == '2'){
	        		return "android";
	        	}
	        }},      
	        {field:'is_def',title:'当前版本',width:80,formatter:function(value,row,index){
	        	if(value == '1'){
	        		return "是";
	        	}
	        	return "否";
	        }},
	        {field:'create_date',title:'创建时间',width:160,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'link',title:'下载链接'},
	    ]]      
	}); 
}

//到新增版本页面
function gotoAddVersion(){
	easyuiWidow({
		winId:'versionDiv',
		title:'新增版本',
		url:$.getContextPath() + 'sysVersion/gotoAddVersionView.do',
		height:500
	}); 
}

//到修改版本的页面
function gotoUpdateVersion(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	easyuiWidow({
		winId:'versionDiv',
		title:'修改版本',
		url:$.getContextPath() + 'sysVersion/gotoUpdateVersionView.do?id=' + row[0].id,
		height:500
	}); 
}

//删除版本数据
function deleteVersionData(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据删除","info");
		return;
	}
	var ids = new Array();
	for(var i=0;i<row.length;i++){
		ids.push(row[i].id);
	}
	deleteData({
		url:$.getContextPath() + 'sysVersion/deleteVersion.do',
		params:{'ids':ids.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 queryVersionData();
				  });
			}else if(data == "FAIL"){
				showMsg("系统提示","删除失败","warning");
			}else{
				showMsg("系统提示","系统异常，请联系系统管理员","error");
			}
		}
	});	
}


//关闭窗口
function closeWin(){
	$('#versionDiv').window('close'); 
	queryVersionData();
}

//保存版本数据
function addData(){
	var link = $("#link").val();
	if(!validateUrl(link)){
		showMsg("系统提示","请输入正确的下载地址","warning");
		return;
	}
	var ver = $("#ver").val();
	if($.isEmpty(ver)){
		showMsg("系统提示","请输入版本号","warning");
		return;
	}
   saveForm({
	   formId:'ff',
	   url:$.getContextPath() + 'sysVersion/addVersion.do',
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
		   }else{
			   showMsg("系统提示","系统异常，请联系系统管理员","error");
		   }
	   }
   });
}

//修改版本数据
function updateData(){
	var link = $("#link").val();
	if(!validateUrl(link)){
		showMsg("系统提示","请输入正确的下载地址","warning");
		return;
	}
	var ver = $("#ver").val();
	if($.isEmpty(ver)){
		showMsg("系统提示","请输入版本号","warning");
		return;
	}
   saveForm({
	   formId:'ff',
	   url:$.getContextPath() + 'sysVersion/updateVersion.do',
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
	window.parent.queryVersionData();//查询数据
}

//查询版本数据
function queryVersionData(){
	var type = $("#selectType").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	reloadTable({
		tableId:'dg',
		params:{type:type,startDate:startDate,endDate:endDate}
	});
}
