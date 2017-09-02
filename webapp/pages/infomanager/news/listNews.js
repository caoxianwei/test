$(function(){
	var selectTitle = $("#selectTitle").val();
	var startDate = $("#startDate").val();
	var endDate = $("#selectEndDate").val();
	loadTable({title:selectTitle,startDate:startDate,endDate:endDate});
	
	$('#beginDate').datetimebox({
	    panelHeight:200
	});
	$('#endDate').datetimebox({
	    panelHeight:200
	});
	
	$('#category_id').combobox({    
	    url:$.getContextPath() + 'news/getNewCategroy.do',    
	    valueField:'category_id',    
	    textField:'category_name',
	    width:130,
	    onLoadSuccess:function(){
	    	var val = $(this).val();
	    	if($.isEmpty(val)){
	    		var val = $(this).combobox('getData');
		    	$(this).combobox('select', val[0].category_id);
	    	}
	    }
	}); 
});

//加载数据表格
function loadTable(parames){
	$('#dg').datagrid({
	    url:$.getContextPath() + 'news/queryData.do',
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
	    pageSize:10,
	    idField:'id',
	    queryParams:parames,
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[      
	    	{field:'ck',checkbox:true },
	    	{field:'category_name',title:'新闻分类',width:120},
	        {field:'news_title',title:'新闻标题',width:280},      
	        {field:'news_source',title:'新闻来源',width:80},
	        {field:'news_show',title:'是否重点显示',width:80,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "是";
	        	}else{
	        		return "否";
	        	}
	        }},
	        {field:'create_date',title:'创建时间',width:160,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'creater',title:'创建人',width:100}
	    ]]      
	}); 
}

//dao显示新闻页面
function gotoShow(news_id){
	if($.isEmpty(news_id)){
		showMsg("系统提示","请选择一条数据进行查看","warning");
		return;
	}
	window.location.href = $.getContextPath() + 'news/showNewsInfo.do?id=' + id;
}

//到添加新闻页面
function gotoAddNewsView(){
	var parames = "selectTitle=" + $("#selectTitle").val();
	parames += "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#selectEndDate").val();
	window.location.href = $.getContextPath() + 'news/gotoAdd.do?' + parames;
}

//到修改新闻的页面
function gotoUpdateNewsView(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	var parames = "selectTitle=" + $("#selectTitle").val();
	parames += "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#selectEndDate").val();
	parames += "&id=" + row[0].news_id;
	window.location.href = $.getContextPath() + 'news/gotoUpdate.do?' + parames;
}

//删除新闻数据
function deleteNewsData(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据删除","info");
		return;
	}
	var ids = new Array();
	for(var i=0;i<row.length;i++){
		ids.push(row[i].news_id);
	}
	deleteData({
		url:$.getContextPath() + 'news/deleteData.do',
		params:{'ids':ids.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 queryData();
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

//保存新闻数据
function addData(){
	var url = $.getContextPath() + 'news/addData.do';
	saveOrUpdate(url);
}

//修改新闻数据
function updateData(){
	var url = $.getContextPath() + 'news/updateData.do';
	saveOrUpdate(url);
}

//保存或修改新闻
function saveOrUpdate(url){
	var category_id = $("#category_id").val();
	var news_title = $("#news_title").val();
	var new_source = $("#news_source").val();
	var new_abstract = $("#news_abstract").val();
	var news_show = $("input[name='news_show']:checked").val();
	var news_content = um.getContent();
	if($.isEmpty(news_title)){
		showMsg("系统提示","请输入新闻标题","warning");
		return;
	}
	if($.isEmpty(new_source)){
		showMsg("系统提示","请输入新闻来源","warning");
		return;
	}
	if($.isEmpty(new_abstract)){
		showMsg("系统提示","请输入新闻摘要","warning");
		return;
	}
	if($.isEmpty(news_content)){
		showMsg("系统提示","请输入新闻内容","warning");
		return;
	}
	var id = $("#news_id").val();
	news_content = $.strEncode(news_content);
	$.post(url,
			   {
		           category_id:category_id,
		           news_title:news_title,
		           news_source:new_source,
		           news_abstract:new_abstract,
		           news_content:news_content,
		           news_show:news_show,
				   news_id:id
			   },function(data){
				   if(data != null){
					   if(data == "SUCCESS"){
						   $.messager.alert("系统提示","保存成功","info",function(){
							   goBack();
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
			   },"text");
}

//返回
function goBack(){
	 var parames = "selectTitle=" + $("#selectTitle").val();
     parames += "&startDate=" + $("#startDate").val();
	 parames += "&endDate=" + $("#selectEndDate").val();
	 window.location.href = $.getContextPath() + "news/initNews.do?" + parames;
}


//查询活动
function queryData(){
	var selectTitle = $("#selectTitle").val();
	var startDate = $("#startDate").val();
	var endDate = $("#selectEndDate").val();
	reloadTable({
		tableId:'dg',
		params:{title:selectTitle,startDate:startDate,endDate:endDate}
	});
}



