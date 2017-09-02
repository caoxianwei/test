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
});

//加载数据表格
function loadTable(parames){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'activity/queryData.do',
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
	        {field:'title',title:'标题',width:200,formatter:function(value,row,index){
	        	var str = '<a title="点击查看活动详情" href="javascript:gotoShow(\''+row.id+'\')">'+value+'</a>';
	        	return str;
	        }},      
	        {field:'create_date',title:'发布时间',width:150,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'begin_date',title:'活动时间',width:280,formatter:function(value,row,index){
	        	return formatDate(row.begin_date) + "--" + formatDate(row.end_date);
	        }},
	        {field:'status',title:'状态',width:80,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "有效";
	        	}else if(value == "0"){
	        		return "无效";
	        	}
	        }}
	    ]]      
	}); 
}

//到添加活动页面
function gotoAddActivityView(){
	var parames = "selectTitle=" + $("#selectTitle").val();
	parames += "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#selectEndDate").val();
	window.location.href = $.getContextPath() + 'activity/gotoAdd.do?' + parames;
}

//到修改活动的页面
function gotoUpdateActivityView(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	var parames = "selectTitle=" + $("#selectTitle").val();
	parames += "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#selectEndDate").val();
	parames += "&id=" + row[0].id;
	window.location.href = $.getContextPath() + 'activity/gotoUpdate.do?' + parames;
}

//到活动预览页面
function gotoShow(id){
	if(id == null){
		showMsg("系统提示","请选择一条数据进行查看","warning");
		return;
	}
	window.location.href = $.getContextPath() + 'activity/showAtivityInfo.do?id=' + id;
}

//删除活动数据
function deleteActivityData(){
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
		url:$.getContextPath() + 'activity/deleteData.do',
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

//修改状态 、 即 开关的方法
function updateStatus(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据操作","info");
		return;
	}
	var id = row[0].id;
	var status = row[0].status;
	if(status == "1"){
		status = "0";
	}else if(status == "0"){
		status = "1";
	}
	$.post($.getContextPath() + 'activity/updateStatus.do',{id:id,status:status},function(data){
		if(data == "SUCCESS"){
			$.messager.alert("系统提示","操作成功","info",function(){
				queryData();
			});
		}else if(data == "FAIL"){
			showMsg("系统提示","操作失败","error");
		}else if(data == "EMPTY"){
			showMsg("系统提示","未查询到信息，请重试","error");
		}else{
			showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
	},"text");
}

//保存活动数据
function addData(){
	var url = $.getContextPath() + 'activity/addData.do';
	saveOrUpdate(url);
}

//修改活动数据
function updateData(){
	var url = $.getContextPath() + 'activity/updateData.do';
	saveOrUpdate(url);
}

//保存或修改活动
function saveOrUpdate(url){
	//标题
	var title = $("#title").val();
	//发布的内容
	/*var content = editor.$txt.html();*/
	var content = um.getContent();
	//图片的临时路径
	var imgPath = $("#imgPath").val();
	//活动开始时间
	var beginDate = $("#beginDate").val();
	//活动结束时间
	var endDate = $("#endDate").val();
	//排序值
	var sort = $("#sort").val();
	if($.isEmpty(title)){
		showMsg("系统提示","请输入活动标题","warning");
		return;
	}
	if($.isEmpty(beginDate) || $.isEmpty(endDate)){
		showMsg("系统提示","请输入活动时间","warning");
		return;
	}
	if($.isEmpty(content)){
		showMsg("系统提示","请输入发布内容","warning");
		return;
	}
	if(!checkNum(sort)){
		showMsg("系统提示","请输入正确的排序值","warning");
		return;
	}
	var id = $("#activityId").val();
	if($.isEmpty(id) && $.isEmpty(imgPath)){
		showMsg("系统提示","请上传活动图片","warning");
		return;
	}
	content = $.strEncode(content);
	$.post(url,
			   {
				   title:title,
				   filePath:imgPath,
				   beginDate:beginDate,
				   endDate:endDate,
				   content:content,
				   sort:sort,
				   id:id
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
					   }else if(data == "FILE_EMPTY"){
						   showMsg("系统提示","请上传文件","error");
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
	 window.location.href = $.getContextPath() + "activity/initActivity.do?" + parames;
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

//上传图片
function uploadImg(){
	$("#uploadImgForm")[0].submit();
}

//选择文件
function selectImg(){
	$("#imgInput").click();
}

//上传文件的回调函数
function callback(data){
	if(!$.isEmpty(data)){
		$("#imgPath").val(data);
		$("#indexImg").css("display","block");
		$("#indexImg").attr("src",$.getContextPath() + "file/showImg.do?path=" + data);
	}
}

