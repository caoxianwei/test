$(function(){
	loadTable();
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'sysDomain/queryData.do',
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
	    pageSize:10,
	    columns:[[      
	    	{field:'ck',checkbox:true },
	        {field:'domain_url',title:'系统域名',width:400},      
	        /*{field:'primary_domain',title:'是否主域名',width:90,formatter:function(value,row,index){
	        	if(value=="0"){
	        		return "否";
	        	}else if(value == "1"){
	        		return "是";
	        	}
	        }}, */
	        {field:'domain_status',title:'是否可用',width:90,formatter:function(value,row,index){
	        	if(value == "0"){
	        		return "不可用";
	        	}else if(value == "1"){
	        		return "可用";
	        	}
	        }},
	        {field:'domain_used',title:'域名用途',width:90,formatter:function(value,row,index){
	        	if(value == "0"){
	        		return "后台";
	        	}else if(value == "1"){
	        		return "图片(文件)";
	        	}else if(value=="2"){
	        		return "推广";
	        	}else if(value == "3"){
	        		return "其他";
	        	}
	        }}
	    ]]      
	}); 
}

//到新增角色页面
function gotoAddDomainView(){
	easyuiWidow({
		winId:'domainDiv',
		title:'新增域名',
		url:$.getContextPath() + 'sysDomain/gotoAdd.do',
		height:500
	}); 
}

//到修改角色的页面
function gotoUpdateDomainView(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	easyuiWidow({
		winId:'domainDiv',
		title:'修改域名',
		url:$.getContextPath() + 'sysDomain/gotoUpdate.do?domain_id=' + row[0].domain_id,
		height:500
	}); 
}

//删除角色数据
function deleteDomainData(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据删除","warning");
		return;
	}
	var domainIds = new Array();
	for(var i=0;i<row.length;i++){
		domainIds.push(row[i].domain_id);
	}
	deleteData({
		url:$.getContextPath() + 'sysDomain/deleteData.do',
		params:{'domain_id':domainIds.join(",")},
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
	$('#domainDiv').window('close'); 
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
	var domain_url = $("#domain_url").val();
	if(!validateDomain(domain_url)){
		showMsg("系统提示","请输入正确的域名","warning");
		return;
	}
   saveForm({
	   formId:'ff',
	   url:$.getContextPath() + 'sysDomain/addData.do',
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

//修改角色数据
function updateData(){
	var domain_url = $("#domain_url").val();
	if(!validateDomain(domain_url)){
		showMsg("系统提示","请输入正确的域名","warning");
		return;
	}
    saveForm({
	   formId:'ff',
	   url:$.getContextPath() + 'sysDomain/updateData.do',
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


//检验网址
function validateDomain(str){
	   var match = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
	   if(!match.test(str)){
		   if(validateUrl(str)){
			   return true;
		   }
		   return false;
	   }else{
		   return true;
	   }
}

