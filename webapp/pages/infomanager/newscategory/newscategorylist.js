$(function(){
	var category_name = $("#category_name").val();
	loadTable({category_name:category_name});
	
});

//加载数据表格
function loadTable(parames){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'newsCategory/queryData.do',
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
	    pageSize:20,
	    queryParams:parames,
	    columns:[[      
	    	{field:'category_id',checkbox:true },
	        {field:'category_name',title:'分类名称'}
	    ]]      
	}); 
}

//到添加新闻分类页面
function gotoAddNew(){
	easyuiWidow({
		winId:'newWin',
		title:'新增新闻分类',
		url:$.getContextPath() + 'newsCategory/gotoAddNew.do',
		height:300,
		width:500
	}); 
}

//到修改新闻分类的页面
function gotoUpdateNew(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	easyuiWidow({
		winId:'newWin',
		title:'修改新闻分类',
		url:$.getContextPath() + 'newsCategory/gotoUpdateNew.do?category_id=' + row[0].category_id,
		height:300,
		width:500
	}); 
}

//删除新闻分类数据
function deleteDataNew(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据删除","info");
		return;
	}
	var ids = new Array();
	for(var i=0;i<row.length;i++){
		ids.push(row[i].category_id);
	}
	deleteData({
		url:$.getContextPath() + 'newsCategory/deleteData.do',
		params:{'ids':ids.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 queryNotice();
				  });
			}else if(data == "FAIL"){
				 showMsg("系统提示","删除失败","error");
			}else if(data == "EMPTY"){
				 showMsg("系统提示","提交的内容为空，请检查","error");
		    }else if(data == "NOTEXIST"){
				 showMsg("系统提示","无操作权限","error");
		    }else{
			     showMsg("系统提示","系统异常，请联系系统管理员","error");
			}
		}
	});	
}
function closeWin(){
	queryNew();
	$('#newWin').window('close'); 
}
//查询新闻分类
function queryNew(){
	var category_name = $("#category_name").val();
	reloadTable({
		tableId:'dg',
		params:{category_name:category_name}
	});
}
